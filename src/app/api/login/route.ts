
import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client/edge"
import bcrypt from "bcryptjs"
import { verifyCaptcha } from "@/lib/utils";
const prisma = new PrismaClient()
export  const  POST =async (req:NextRequest) => {
        try {
            const data =  await req.json()
            const {email,password,token} = data as any
            if(token) {
                const isValid = await verifyCaptcha(token)
                if(!isValid) {
                    return NextResponse.json({message:"invalid Captcha,try again"})
                }
            }
            if(email && !password) {
                const userEmail = await prisma.user.findUnique({
                    where:{
                        email
                    }
                })
                if(!userEmail) {
                    return NextResponse.json({message:`No user found`})
                }
                return NextResponse.json({success:true},{status:200})
            }
            const user = await prisma.user.findUnique({
                where:{
                    email:email
                }
            })
            
            if(!user) {
                return NextResponse.json({message:"No user found"},{status:404})
            }
            
            const passCheck = await bcrypt.compare(password, user.password);
            if(!passCheck) {
                return NextResponse.json({message:"Password incorrect"})
            } 
            
            return NextResponse.json({success:true},{status:200})
        } catch (error:any) {
            return NextResponse.json({error:`Internal server error: ${error.message}`},{status:500})
        }
    
}