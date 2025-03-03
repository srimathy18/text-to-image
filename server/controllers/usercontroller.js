import userModel from "../models/usermodel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import transactionModel from "../models/transactionModel.js";

// Register a new user and return _id so the frontend can use it
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
    const newUser = new userModel({ name, email, password: hashedPassword, creditBalance: 5 });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ success: true, token, user: { _id: newUser._id, name: newUser.name, email: newUser.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Log in an existing user and return _id along with other user details
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
    res.status(200).json({ success: true, token, user: { _id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get user credits (requires authentication middleware to set req.userId)
const userCredits = async (req, res) => {
  try {
    const userId = req.userId; // Comes from auth middleware
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

// Dummy Payment Endpoint
const paymentDummy = async (req, res) => {
    try {
      console.log("Received request for paymentDummy:", req.body);
  
      // Get userId from req.userId (set by userAuth) or fallback to req.body.userId
      const userId = req.userId || req.body.userId;
      const { planId } = req.body;
      if (!userId || !planId) {
        console.log("❌ Missing Details: userId or planId is undefined");
        return res.status(400).json({ success: false, message: "Missing Details" });
      }
  
      // Fetch user using the userId from the auth middleware
      const userData = await userModel.findById(userId);
      if (!userData) {
        console.log("❌ User not found in DB");
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Determine plan details
      let credits, plan, amount;
      switch (planId) {
        case "Basic":
          plan = "Basic";
          credits = 100;
          amount = 10;
          break;
        case "Advanced":
          plan = "Advanced";
          credits = 500;
          amount = 50;
          break;
        case "Business":
          plan = "Business";
          credits = 2000;
          amount = 100;
          break;
        default:
          console.log("❌ Invalid Plan ID:", planId);
          return res.status(400).json({ success: false, message: "Plan not found" });
      }
  
      console.log("✅ Plan selected:", plan, "Amount:", amount, "Credits:", credits);
  
      // Create a transaction record
      const newTransaction = await transactionModel.create({
        userId,
        plan,
        amount,
        credits,
        date: Date.now(),
      });
  
      console.log("✅ New Transaction Created:", newTransaction);
  
      // Dummy order response
      const dummyOrder = {
        id: "order_dummy123",
        amount: amount * 100, // in paise
        currency: process.env.CURRENCY || "INR",
        receipt: newTransaction._id.toString(),
        status: "created",
      };
  
      res.status(200).json({ success: true, order: dummyOrder });
    } catch (error) {
      console.error("❌ Payment Dummy Error:", error);
      res.status(500).json({ success: false, message: "Payment processing failed", error: error.message });
    }
  };
  

// Dummy Payment Verification Endpoint
const verifyDummy = async (req, res) => {
  try {
    const { receipt } = req.body;
    if (!receipt) {
      return res.status(400).json({ success: false, message: "Missing receipt" });
    }

    const transactionData = await transactionModel.findById(receipt);
    if (!transactionData) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    if (transactionData.payment) {
      return res.status(400).json({ success: false, message: 'Payment already verified' });
    }

    const userData = await userModel.findById(transactionData.userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found for this transaction' });
    }

    // Update user's credit balance and mark transaction as paid
    const creditBalance = userData.creditBalance + transactionData.credits;
    await userModel.findByIdAndUpdate(userData._id, { creditBalance });
    await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });
    
    return res.status(200).json({ success: true, message: "Credits added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, userCredits, paymentDummy, verifyDummy };
