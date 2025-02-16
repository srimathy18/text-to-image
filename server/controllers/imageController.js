import axios from "axios";
import userModel from "../models/usermodel.js";
import FormData from "form-data";

const generateImage = async (req, res) => {
    try {
        const { prompt } = req.body;
        const userId = req.userId; // Get userId from middleware

        if (!userId || !prompt) {
            return res.status(400).json({ success: false, message: 'Missing details (userId or prompt)' });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.creditBalance <= 0) {
            return res.status(400).json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance });
        }

        // Prepare form data for ClipDrop API
        const formData = new FormData();
        formData.append('prompt', prompt);

        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
                ...formData.getHeaders()
            },
            responseType: 'arraybuffer'
        });

        // Convert binary image to Base64
        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        // Deduct 1 credit from user's balance
        await userModel.findByIdAndUpdate(user._id, { $inc: { creditBalance: -1 } });

        res.status(200).json({
            success: true,
            message: "Image Generated",
            creditBalance: user.creditBalance - 1,
            resultImage
        });

    } catch (error) {
        console.error("Image Generation Error:", error.message);
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
};

export { generateImage };
