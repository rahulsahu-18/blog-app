import jwt from 'jsonwebtoken'
import { AdminType } from "../types"
import type { Request, Response } from "express";
export const login = async (req:Request,res:Response) => {
    const {email,password} = req.body as AdminType; 
    try {
        if(!email || !password)
            return res.status(401).json({success:false,message:"feilds cant be blank"});

        if(email !== process.env.ADMIN_EMAIL && password !== process.env.ADMIN_PASSWORD)
            return res.status(401).json({success:false,message:"invalid cradencial !!"});
        
        const token = jwt.sign({email},process.env.JWT_SECRET!,{expiresIn:'7d'});

        res.cookie("token",token,{
            sameSite:'lax',
            maxAge:7 * 24 * 60 * 60 * 1000,
            httpOnly:true,
            secure:false,
        })
       return res.status(200).json({success:true,message:"admin logged in successfully"});
    } catch (error) {
        return res.status(401).json({success:false,message:"something went worgn in login"});
    }
}
