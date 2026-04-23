import { Request, Response } from "express";
import { razorpayInstance } from "../services/razor-pay.service.js";
import { log } from "console";
import dotenv from 'dotenv'
dotenv.config();

export const createPaymentLink = async (req: Request, res: Response) => {
  try {
    console.log(process.env.KEY_ID);
    console.log(process.env.KEY_SECRET);
    
    const { amount, name, email } = req.body;
    console.log("in payment")
    const paymentLink = await razorpayInstance.paymentLink.create({
      amount: amount*100, 
      currency: "INR",
      description: "Test Payment",
      customer: {
        name,
        email,
      }
    });

    return res.json({
      success: true,
      url: paymentLink.short_url,
      id: paymentLink.id,
    });
  } catch (error: any) {
    console.log(error);
    
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};