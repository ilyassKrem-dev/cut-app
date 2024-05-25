"use server"

import { PrismaClient } from "@prisma/client/edge"

const prisma = new PrismaClient()


export const  getContacts = async (userId:string) => {
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })
        if(!user) return {error:"user not found"}
        const convos = await prisma.convo.findMany({
            where:{
                participants:{
                    some:{
                        userId:user.id
                    }
                }
            },
            include:{
                participants:{
                    select:{
                        barber:{
                            select:{
                               images:true,
                               salonName:true
                            }
                        }
                    }
                }
            }

        })
        return convos
    } catch (error:any) {
        throw new Error(`Failed to get messages ${error.message}`)
    }

}