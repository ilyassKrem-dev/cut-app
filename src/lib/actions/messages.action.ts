"use server"

import { PrismaClient } from "@prisma/client/edge"

const prisma = new PrismaClient()


export const  getContacts = async (userId:string,type:string) => {
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })
        if(!user) return {error:"user not found"}
        let convos;
        if(type == "user") {
            convos = await prisma.convo.findMany({
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
        } else {
            convos = await prisma.convo.findMany({
                where:{
                    participants:{
                        some:{
                            barber:{
                                userId:userId
                            }
                        }
                    }
                },
                include:{
                    participants:{
                        select:{
                            user:{
                                select:{
                                    image:true,
                                    name:true
                                }
                            }
                        }
                    }
                }
    
            })
        }
        return convos
    } catch (error:any) {
        throw new Error(`Failed to get messages ${error.message}`)
    }

}

export const getConvo = async(convoId:string,userId:string) => {
    try {
        const convo = await prisma.convo.findUnique({
            include:{
                participants:{
                    select:{
                        barber:{
                            select:{
                                id:true,
                                salonName:true,
                                images:true,
                                openDays:true,
                                time:true,
                                holidays:true,
                                phoneNumber:true
                            }
                        },
                        user:{
                            select:{
                                id:true,
                                name:true,
                                image:true
                            }
                        }
                    }
                },
                messages:true
            },
            where:{
                id:convoId,
                participants:{
                    some:{
                        OR:[
                            {
                                userId:userId
                            },
                            {barber:{userId:userId}}
                        ]
                        
                    }
                }
            }
        })
        const newConvo = convo && {...convo,participants:convo?.participants[0]}
        return newConvo
    } catch (error:any) {
        throw new Error(`Failed to getConvo ${error.message}`)
    }
}