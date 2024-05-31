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


export const addFavorite = async(userId:string | null | undefined,barberId:string) => {
    try {
        const findFavotire = await prisma.favorite.findFirst({
            where:{
                userId:userId as string
            }
        })
        if(findFavotire) {
           await prisma.favorite.delete({
                where:{
                    id:findFavotire.id
                }
            })
            return true
        }
        await prisma.user.update(
            {
                where:{
                    id:userId  as string
                },
                data:{
                    favorites:{
                        create:{
                            barber:{
                                connect:{
                                    id:barberId
                                }
                            },
                        }
                    }
                },
                select:{
                    favorites:true
                }
            }
        )
        return true
    } catch (error:any) {
        throw new Error(`Failed to add to favorites ${error.message}`)
    }
}

export const getUserFavorites = async(userId:string | null | undefined,barberId:string) => {
    try {
        const user = await prisma.user.findUnique(
            {
                where:{
                    id:userId as string
                },
                select:{
                    favorites:true
                }
            }
        )
        if(!user) {
            throw new Error(`Failed to get  User`)
        }
        const UserFav = user.favorites.some(fav=>fav.userId == userId&&fav.barberId==barberId)

        return UserFav
    } catch (error:any) {
        throw new Error(`Failed to get  favorites ${error.message}`)
    }
}

export const fetchUser = async(userId:string) => {
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            },
            select:{
                comments:true,
                id:true,
                isBarber:true,
                name:true,
                image:true,
                email:true,
                emailVerified:true,
                phoneNumber:true,
                createdAt:true,
                completed:true

            }
        })
        if(!user) return {message:"Error getting profile"}
        return user
    } catch (error:any) {
        throw Error(`Failed to get Profile ${error.message}`)
    }
}