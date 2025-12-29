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


export const addUserComment = async(
    {
        userId,
        userComment,
        rating,
        barberId
    }:{
        userId:string,
        userComment:string,
        rating:number,
        barberId:string
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
        if(!user) throw new Error(`Error getting user`)
        const barber = await prisma.barber.findUnique(
    
            {
                where:{
                    id:barberId
                }
            }
            )
        if(!barber) throw new Error(`Error getting barber`) 
        const comment = await prisma.comment.findFirst(
            {
                where:{
                    userId:user.id,
                    barberId:barber.id
                },

                select:{
                    id:true,
                    stars:true
                }
            }
            )
        if(comment) {
            await prisma.comment.update(
                {
                    where:{
                        id:comment.id
                    },
                    data:{
                        comment:userComment,
                    }
                }
            )
            await prisma.star.update(
                {
                    where:{
                        id:comment?.stars?.id
                    },
                    data:{
                        star:rating
                    }
                }
            )
            return {success:true}
        }
        const createdComment = await prisma.comment.create(
            {
               data:{
                userId:userId,
                barberId:barberId,
                comment:userComment
               }
            }
            )
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
                        star:rating,
                        commentId:createdComment.id
                    }
                }
            )

        } else {
            await prisma.star.update(
                {
                    where:{
                        id:star.id
                    },
                    data:{
                        commentId:createdComment.id,
                        star:rating
                    }
                }
            )
        }
        return {success:true}
    } catch (error) {
        throw new Error(`Internal server error`)
    }
}

export const getUserComment = async(userId:string,barberId:string) => {
    if(!userId || !barberId) return null
    try {
        const user = await prisma.user.findUnique(
            {
                where:{
                    id:userId
                }
            }
        ) 
        if(!user) throw new Error(`Error getting user`)
        const barber = await prisma.barber.findUnique(
    
            {
                where:{
                    id:barberId
                }
            }
            )
        if(!barber) throw new Error(`Error getting barber`) 
        const comment = await prisma.comment.findFirst(
            {
                where:{
                    userId:user.id,
                    barberId:barber.id
                },

                select:{
                    comment:true
                }
            }
            )
        const rating = await prisma.star.findFirst(
            {
                where:{
                    userId:userId,
                    barberId:barberId
                }
            }
        )
        const newCommentR = {
            comment:comment?.comment ||"",
            rating:rating?.star || 0
        }
        return newCommentR
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export const loadMoreComments = async(
    {
        barberId,
        lastCommentId
    }:{
        barberId:string,
        lastCommentId:string
    }
) => {
    try {
        const barber = await prisma.barber.findUnique(
            {
                where:{
                    id:barberId
                }
            }
        )
        if(!barber) throw new Error(`Error getting barber`)
        const lastComment = await prisma.comment.findUnique(
            {
                where:{
                    id:lastCommentId
                }
            }
            )
        const comments = await prisma.comment.findMany(
            {
                where:{
                    barberId:barberId,
                    createdAt:{
                        lt:lastComment?.createdAt
                    }
                    
                },
                orderBy:{
                    createdAt:'desc'
                },
                take:10,
                select:{
                    comment:true,
                    id:true,
                    stars:{
                        select:{
                            star:true
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
            
            }
            )
        return comments
    } catch (error) {
        throw new Error(`Internal server Error`)
    }
}