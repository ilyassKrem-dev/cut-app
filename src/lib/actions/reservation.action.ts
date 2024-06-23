"use server"
import { PrismaClient } from "@prisma/client/edge"


const prisma = new PrismaClient()


export const getReservations = async({
    barberId,
    }:
    {
        barberId:string;
    }) => {

    try {
        const reservation = await prisma.reservation.findMany(
            {
                where:{
                    barberId:barberId
                },
                select:{
                    date:true,
                    time:true,
                }
            }
        )
        if(!reservation) throw new Error('No reservations founds')
        return reservation
    } catch (error) {
        throw new Error(`Internal server error`)
    }
}

export const addReservation = async({
    userId,
    barberId,
    details
}:{
    userId:string;
    barberId:string;
    details:{
        price:number,
        date:string;
        time:string
    }
}) => {
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })  
        if(!user) throw new Error(`User not found`)
        const barber = await prisma.barber.findUnique({
                where:{
                    id:barberId
                }
        })
        if(!barber) throw new Error(`Barber not found`)
        
        await prisma.reservation.create({
            data:{
                date:details.date,
                price:details.price,
                time:details.time,
                userId:userId,
                barberId:barberId
            }
        })

        return {success:true}
    } catch (error) {
        throw new Error(`Error reserving the barber,try again later`)
    }
}