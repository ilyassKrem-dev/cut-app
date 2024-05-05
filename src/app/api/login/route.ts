
import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client/edge"
import bcrypt from "bcrypt"
import { signIn } from "@/auth"
const prisma = new PrismaClient()
export  const  POST =async (req:NextRequest) => {
        try {
            const data =  await req.json()
            const {email,password} = data as any
            console.log(email)
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
            return signIn("credentials",{email:email})
        } catch (error:any) {
            return NextResponse.json({error:`Internal server error: ${error.message}`},{status:500})
        }
    
}