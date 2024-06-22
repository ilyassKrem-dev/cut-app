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
                    time:true
                }
            }
        )
        if(!reservation) throw new Error('No reservations founds')
        return reservation
    } catch (error) {
        throw new Error(`Internal server error`)
    }
}