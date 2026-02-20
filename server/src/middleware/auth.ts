import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

export const auth = (req:Request,res:Response,next:NextFunction) => {
   const token = req.cookies?.token;

   if(!token)
    return res.status(400).json({success:false,message:"you are unauthorize"});

   try {
     jwt.verify(token,process.env.JWT_SECRET!);
     next();
   } catch (error) {
    return res.status(401).send({ message: "You are unauthorized. login again" });
   }
}