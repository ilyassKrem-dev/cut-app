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
        let allConvos = {
            barbers:[] as any[],
            clients:[] as any[]
        } as any
        if(!user) return {error:"user not found"}
        const barber = await prisma.barber.findFirst(
            {
                where:{
                    userId:userId
                }
            }
        )
        if(!barber) {
            allConvos.barbers = await prisma.convo.findMany({
                 where:{
                     participants:{
                         some:{
                             userId:user.id
                         }
                     }
                 },
                 include:{
                    messages:{
                        orderBy:{
                            sentAt:"desc"
                        }
                    },
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
            allConvos.clients = await prisma.convo.findMany({
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
                    messages:{
                        orderBy:{
                            sentAt:"desc"
                        }
                    },
                    participants:{
                        select:{
                            user:{
                                select:{
                                    image:true,
                                    name:true
                                }
                            },
                        }
                    }
                }
    
            })
            allConvos.barbers = await prisma.convo.findMany({
                where:{
                    participants:{
                        some:{
                            userId:user.id
                        }
                    }
                },
                include:{
                   messages:{
                       orderBy:{
                           sentAt:"desc"
                       }
                   },
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
        }

        
        const barbersConvos = allConvos.barbers.length > 0 ? {...allConvos,barbers:[...allConvos.barbers].map((convo:any) => {
            return {...convo,messages:convo.messages.length>0 ?convo.messages[0]: null,unseen:convo.messages.filter((msg:any) => !msg.isSeen && msg.receiverId === userId)}
        })} : []
        allConvos.barbers = barbersConvos.barbers ? barbersConvos.barbers : []
        const clientsConvos = allConvos.clients.length > 0 ? {...allConvos,clients:[...allConvos.clients].map((convo:any) => {
            return {...convo,messages:convo.messages.length>0 ?convo.messages[0]: null,unseen:convo.messages.filter((msg:any) => !msg.isSeen && msg.receiverId == barber?.id)}
        })} : []
        allConvos.clients = clientsConvos.clients? clientsConvos.clients : []

        return allConvos
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
                                phoneNumber:true,
                                userId:true
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