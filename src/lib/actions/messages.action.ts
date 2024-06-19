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
                messages:{
                    orderBy:{
                        sentAt:"desc"
                    },
                    take:20
                }
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
        const reversed = newConvo?.messages.reverse()
        return {...newConvo,messages:reversed}
    } catch (error:any) {
        throw new Error(`Failed to getConvo ${error.message}`)
    }
}
export const  getMoreMessages = async(convoId:string,lastMessageId:string,take:number=20) => {
    try {
        const lastMessage = await prisma.message.findUnique({
            where:{
                id:lastMessageId
            }
        })

        if(!lastMessage) {
            throw new Error("Message not found")
        }
        const moreMessages = await prisma.message.findMany(
            {
                where:{
                    convoId:convoId,
                    sentAt:{
                        lt:lastMessage.sentAt
                    }
                },
                orderBy:{
                    sentAt:"desc"
                },
                take:take
            }
        )
    
        const reversed = moreMessages.reverse()
        return reversed
    } catch (error) {
        throw new Error(`Error fetching older messages,try again later`)
    }
}
export const getUnreedMessagesN = async(userId:string) => {
    try {
        const user = await prisma.user.findUnique(
            {
                where:{
                    id:userId
                }
            }
        )
        if(!user) throw new Error(`User not found`)
        const barber = await prisma.barber.findFirst({
        where:{
            userId:userId
        }})
        let messages;
        if(barber) {
            messages = await prisma.message.findMany(
                {
                    where:{
                        receiverId:barber.id,
                        isSeen:false
                    }
                })
        }else {
            messages = await prisma.message.findMany(
            {
                where:{
                    receiverId:user.id,
                    isSeen:false
                }
            })

        }
        const messagesChanged = messages.map(msg => {
            return msg.convoId
        } )
        
        return messagesChanged
    } catch (error) {
        throw new Error('Failed to load')
    }
}