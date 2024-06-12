
"use server"

import { PrismaClient } from "@prisma/client/edge"

const prisma = new PrismaClient()


export const deleteBarberImages = async(
    {
        userId,
        images,
        barberId
    }:
    {
        userId:string;
        images:string[];
        barberId:string;
    }
) => {
    try {
        const user = await prisma.user.findUnique(
            {
                where:{
                    id:userId
                }
            }
        )
        if(!user) throw new Error(`No user found`)
        if(user.barberId !== barberId) throw new Error(`This user is not the barber of this salon`)
        const barber = await prisma.barber.findUnique(
            {
                where:{
                    id:barberId
                }
            }
                )
        if(!barber) throw new Error(`No barber found`)
        const updatedImages = barber.images.filter((img:string) => !images.includes(img))
       
        await prisma.barber.update(
            {
                where:{
                    id:barber.id
                },
                data:{
                    images:updatedImages
                }
            }
            )
        return updatedImages
    } catch (error:any) {
        throw new Error(`Failed to delete images,try again later`)
    }
}

export const addImagesTobarber = async(
    {
        userId,
        barberId,
        images
    }:{
        userId:string;
        barberId:string;
        images:string[];
    }
) => {
    try {
        const user = await prisma.user.findUnique(
            {
                where:{
                    id:userId
                }
            }
        ) 
        if(!user) throw new Error(`No user found`)
        if(user.barberId !== barberId) throw new Error(`This user is not the barber of this salon`)
        const barber = await prisma.barber.findUnique(
            {
                where:{
                    id:barberId
                },
                select:{
                    images:true
                }
            }
                )
        if(!barber) throw new Error(`No barber found`)
        const newImages = [...barber.images,...images]
        const updatedBarber = await prisma.barber.update(
            {
                where:{
                    id:barberId
                },
                data:{
                    images:newImages
                },
                select:{
                    images:true
                }
            }
        )
        return updatedBarber
    } catch (error) {
        throw new Error(`Failed to add images`)
    }
}