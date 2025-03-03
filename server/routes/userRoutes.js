// routes/userRoutes.js
import express from 'express';
import { registerUser, loginUser, userCredits, paymentDummy, verifyDummy } from '../controllers/usercontroller.js';
import userAuth from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/credits', userAuth, userCredits);
userRouter.post('/pay-dummy', userAuth, paymentDummy);
userRouter.post('/verify-dummy', verifyDummy);

export default userRouter;
