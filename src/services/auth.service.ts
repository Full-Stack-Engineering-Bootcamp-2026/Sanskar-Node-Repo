import bcrypt from 'bcrypt'
import { Service } from "typedi";
import User from '../models/user.model.js';
import { HttpError } from "../errors/HttpError.js";

@Service()
export class AuthService {
    async signup(name:string,email:string,password:string){
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password,saltRounds);
        const user = new User({
            email,
            password:hashPassword,
            name
        });
        return await user.save();
    }

    async login(email:string,password:string){
        const user = await User.findOne({email});
        if(!user){
            console.log(user)
            throw new HttpError("User Not found",404);
        }
        console.log(user)
        const hash = user.password;

        console.log(hash);
        console.log(password);
        
        const result = await bcrypt.compare(password,hash);
        console.log(result);
        return result
        
    }
}