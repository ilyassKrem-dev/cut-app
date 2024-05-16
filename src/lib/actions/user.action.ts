"use server"
import { PrismaClient } from "@prisma/client/edge"

const prisma = new PrismaClient()
export const SkipCompletion = async(id:string | null | undefined) => {
    
    const user = await prisma.user.update({
        where: {
            id:id as string
        },
        data:{
            completed:true
        }
    })
    if(!user) return {succuss:false}
    return {succuss:true}
}

export const completeProfileInfo = async(
    {
        id,
        phone,
        imageUrl}
        :
        {
        id:string |null|undefined;
        phone:string;
        imageUrl:string | null | undefined
    }) => {
    const user = await prisma.user.update({
        where:{
            id:id as string
        },data:{
            phoneNumber:phone,
            image:imageUrl,
            completed:true
        }
    })
    if(!user) return {success:false}
    return {success:true}
}

export const fetchUserNumber = async(userId:string) => {
    const user = await prisma.user.findUnique({
        where:{
            id:userId
        },
        select:{
            phoneNumber:true
        }
    })
    return user
}
