import express from 'express'
import { createPaymentLink } from '../controllers/razor-pay.controller.js';

const router = express.Router();

router.post('/',createPaymentLink)


export default router