"use server"
import { PrismaClient } from "@prisma/client/edge"
import bcrypt from "bcryptjs"
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
                phoneNumber:true,
                createdAt:true,
                completed:true,
                barberId:true

            }
        })
        if(!user) return {message:"Error getting profile"}
        return user
    } catch (error:any) {
        throw Error(`Failed to get Profile ${error.message}`)
    }
}

export const updateUser = async({userId,name,email,image,number}:{
    userId:string;
    name:string;
    email:string;
    image:string;
    number:string
}) => {

    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })
        if(!user) throw new Error(`No user found`)
        if(!number) {
            const updatedUser = await prisma.user.update({
                where:{
                    id:user.id
                },
                data:{
                    name:name,
                    email:email,
                    image:image,
                    completed:false
                }
        
            })
            return updatedUser
        } 
        const updatedUser = await prisma.user.update({
            where:{
                id:user.id
            },
            data:{
                name:name,
                email:email,
                image:image,
                phoneNumber:`+212${number}`,
                completed:true
            },
            
        })
        return updatedUser
    } catch (error:any) {
        throw new Error(`Failed to update profile ${error.message}`)
    }
}


export const changeUserPassword = async(
    {
        userId,
        email,
        passwords
    }:{
        userId?:string;
        email?:string;
        passwords:{
            oldPass?:string;
            newPass:string;
            confirmPass:string;
        }
    }) => {
    try {
        let user;
        if(userId) {
            user = await prisma.user.findUnique({
                where:{
                    id:userId
                }
            })
        } else {
            user = await prisma.user.findFirst({
                where:{
                    email:email
                }
            })
            if(!user) {
                throw new Error(`Failed to find User`)
            }
            if(passwords.newPass !== passwords.confirmPass) {
                throw new Error(`Passwords dont match`)
            }
            const salt = await bcrypt.genSalt(12)
            const hashedPassword = await bcrypt.hash(passwords.newPass,salt)
            await prisma.user.update({
                where:{
                    email:email
                },
                data:{
                    password:hashedPassword
                }
            })
            return {succes:true}
        }
        if(!user) {
            throw new Error(`Failed to find User`)
        }
        if(passwords.newPass !== passwords.confirmPass) {
            throw new Error(`Passwords dont match`)
        }
        if(passwords.oldPass == passwords.newPass) {
            throw new Error(`Old password must not be the same as the new`)
        }
        const comparePass = await bcrypt.compare(passwords.oldPass as string,user.password)
        if(!comparePass) {
            throw new Error(`Old passowrd is incorrect`)
        }
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(passwords.newPass,salt)
        await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                password:hashedPassword
            }
        })
        return {succes:true}
        
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export const getAllFavorites = async(userId:string) => {
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })
        if(!user) throw new Error(`Cant find user`)
        const favorites = await prisma.favorite.findMany({
            where:{
                userId:userId
            },
            select:{
                barber:{
                    select:{
                        images:true,
                        salonName:true,
                        id:true,
                        time:true,
                        Prices:true
                    }
                },
                id:true,

            }
        })
        const favoriteUpdated = favorites.map((fav) => ({...fav,barber:{...fav.barber,images:fav.barber.images[0]}}))
        return favoriteUpdated
    } catch (error:any) {
        throw new Error(error.message)
    }
}