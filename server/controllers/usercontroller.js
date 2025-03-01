import userModel from "../models/usermodel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import razorpay from 'razorpay'
import transactionModel from "../models/transactionModel.js";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email is already registered' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPassword, creditBalance: 5 }); // Default credits
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({ success: true, token, user: { name: newUser.name, email: newUser.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid Credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ success: true, token, user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const userCredits = async (req, res) => {
    try {
        const userId = req.userId; // req.userId comes from middleware
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized Access.' });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ 
            success: true, 
            credits: user.creditBalance, 
            user: { name: user.name, email: user.email } 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};


const razorpayInstance=new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
    try {
        const { userId, planId } = req.body;

        // Validate required fields
        if (!userId || !planId) {
            return res.status(400).json({ success: false, message: 'Missing Details' });
        }

        // Fetch user
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Determine plan details
        let credits, plan, amount;
        switch (planId) {
            case 'Basic':
                plan = 'Basic';
                credits = 100;
                amount = 10;
                break;
            case 'Advanced':
                plan = 'Advanced';
                credits = 500;
                amount = 50;
                break;
            case 'Business':
                plan = 'Business';
                credits = 2000;
                amount = 100;
                break;
            default:
                return res.status(400).json({ success: false, message: 'Plan not found' });
        }

        // Create transaction record in DB
        const newTransaction = await transactionModel.create({
            userId,
            plan,  // Ensure this matches the schema
            amount,
            credits,
            date: Date.now(),
        });

        // Create payment order
        const options = {
            amount: amount * 100, // Convert to paise
            currency: process.env.CURRENCY || 'INR',
            receipt: newTransaction._id.toString(),
        };

        const order = await razorpayInstance.orders.create(options);

        res.status(200).json({ success: true, order });

    } catch (error) {
        console.error('Payment Error:', error);
        res.status(500).json({ success: false, message: 'Payment processing failed', error: error.message });
    }
};


const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;

        // Fetch the order details using the correct method name
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        
        // Check if the order status indicates successful payment
        if (orderInfo.status === 'paid') {
            const transactionData = await transactionModel.findById(orderInfo.receipt);

            // Check if payment is already verified
            if (transactionData.payment) {
                return res.status(400).json({ success: false, message: 'Payment already verified' });
            }

            const userData = await userModel.findById(transactionData.userId);
            if (!userData) {
                return res.status(404).json({ success: false, message: 'User not found for this transaction' });
            }

            // Update the user credits and transaction status
            const creditBalance = userData.creditBalance + transactionData.credits;
            await userModel.findByIdAndUpdate(userData._id, { creditBalance });
            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });
            
            return res.status(200).json({ success: true, message: "Credits added successfully" });
        } else {
            return res.status(400).json({ success: false, message: "Payment not completed" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};


export { registerUser, loginUser, userCredits,paymentRazorpay ,verifyRazorpay};
