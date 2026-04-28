import express from 'express'
import Joi from 'joi';
import AuthController from '../controllers/auth.controller.js';

const userSchema = Joi.object({
    email:Joi.string().email().required(),
    name:Joi.string().required(),
    password:Joi.string().min(6).required()
});

const router = express.Router();
const controller = new AuthController();

router.post("/signup",controller.signup.bind(controller));
router.post("/login",controller.login.bind(controller));


export default router;