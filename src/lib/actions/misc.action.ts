"use server"
import { PrismaClient } from "@prisma/client/edge"

const prisma = new PrismaClient()

export const checkForRating = async(userId:string,barberId:string) => {
    try {
        const user = await prisma.user.findUnique(
            {
                where:{
                    id:userId
                },
                include:{
                    comments:true,
                
                }
            }
        )
        
        if(!user) throw new Error(`Error finding the user`)
        const convo = await prisma.convo.findFirst(
                {
                    where:{
                        participants:{
                            some:{
                                userId:userId,
                                barberId:barberId
                            }
                        }
                    }
                }
            )
        let rating:any; 
        try {
            rating = await prisma.star.findFirst({
                where:{
                    userId:userId,
                    barberId:barberId
                }
            })
        } catch (error) {
            rating = 0
        }


        const canRate = user.comments.some(comment => comment.barberId==barberId) || convo 
        
       
        return canRate ? {can:true,rating:rating.star || 0} :{can:false,rating:0}
        
        
        
    } catch (error) {
        throw new Error("Internal server error")
    }
}

export const changeRating = async({
    userId,
    barberId,
    rating,
}:{
    userId:string;
    barberId:string;
    rating:number
}) => {
    try {
        const user = await prisma.user.findUnique(
            {
                where:{
                    id:userId
                }
            }
        )
        if(!user) throw new Error(`Error finding user,try agail later`)

        const barber = await prisma.barber.findUnique(
            {
                where:{
                    id:barberId
                }
            }
        )
        if(!barber) throw new Error(`Error finding barber,try agail later`)
        if(barber.userId === userId) throw new Error(`Barber cant rate his salon`)
        const star = await prisma.star.findFirst(
            {
                where:{
                    userId:userId,
                    barberId:barberId
                }
            }
        )
        if(!star) {
            await prisma.star.create(
                {
                    data:{
                        userId:userId,
                        barberId:barberId,
                        
                        star:rating
                    }
                }
            )
            return {message:"Rating has been added"}
        }
        await prisma.star.update(
            {
                where:{
                    id:star.id
                },
                data:{
                    star:rating
                }
            }
        )
        return {message:"Rating has been changed"}
    } catch (error:any) {
        throw new Error(error.message)
    }
}


export const getReservations = async(userId:string) => {
    try {
        const user = await prisma.user.findUnique(
            {
                where:{
                    id:userId
                }
            }
        )
        if(!user) throw new Error(`Error getting user`)
        const reserve = await prisma.reservation.findMany(
            {
                where:{
                    userId:user.id
                },
                select:{
                    barber:{
                        select:{
                            id:true,
                            salonName:true,
                            images:true,
                            latitude:true,
                            longitude:true,
                            address:true,
                            city:true
                        }
                    },
                    userId:true,
                    price:true,
                    time:true,
                    date:true,
                    id:true,
                }
            }
        )
        const newReserve = reserve.map(res => ({...res,barber:{...res.barber,images:res.barber.images[0]}}))
        return newReserve
    } catch (error) {
        throw new Error(`Internal server error`)
    }
} 

export const cancelReservation = async(userId:string,resId:string) => {
    try {
        const user = await prisma.user.findUnique(
            {
                where:{
                    id:userId
                }
            }
        )
        if(!user) throw new Error(`Error getting user`)
        const reserve = await prisma.reservation.findUnique(
    
            {
                where:{
                    id:resId
                }
            }
            )

        if(!reserve) throw new Error(`Error,no reservation found`)
        await prisma.reservation.delete(
            {
                where:{
                    id:resId,
                    userId:user.id
                }
            }
                )

        return {success:true}
    } catch (error) {
        throw new Error(`Internal server Error`)
    }
}