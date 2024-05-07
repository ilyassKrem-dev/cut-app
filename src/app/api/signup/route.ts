
import { NextRequest,NextResponse } from "next/server"
import { verifyCaptcha } from "@/lib/utils"
import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client/edge"
const prisma = new PrismaClient()
export const POST = async(req:NextRequest) => {
   

    try {
        const data = await req.json()
        const {email,password,name,isBarber,token} = data
        
        if(token) {
            const isValid = await verifyCaptcha(token)
            if(!isValid) {
                return NextResponse.json({message:"Invalid captcha,try again"})
            }
        }
        if(email && !password) {
            const findEmail = await prisma.user.findUnique({
                where:{
                    email:email
                }
            })
            if(findEmail) {
                return NextResponse.json({message:"Email already used"})
            }
            return NextResponse.json({success:true},{status:200})
        }
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password,salt)
        const addUser = await prisma.user.create({
            data:{
                email:email,
                name:name,
                password:hashedPassword,
                isBarber:isBarber
            }
        })
        if(!addUser) {
            return NextResponse.json({message:"Failed to create account"})
        }
        return NextResponse.json({success:true},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Internal server error"},{status:500})
    }
}