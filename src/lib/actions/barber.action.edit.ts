
"use server"

import { PrismaClient } from "@prisma/client/edge"

const prisma = new PrismaClient()


export const deleteBarberImages = async(
    {
        userId,
        images,
        barberId
    }:
    {
        userId:string;
        images:string[];
        barberId:string;
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
        if(!user) throw new Error(`No user found`)
        if(user.barberId !== barberId) throw new Error(`This user is not the barber of this salon`)
        const barber = await prisma.barber.findUnique(
            {
                where:{
                    id:barberId
                }
            }
                )
        if(!barber) throw new Error(`No barber found`)
        const updatedImages = barber.images.filter((img:string) => !images.includes(img))
       
        await prisma.barber.update(
            {
                where:{
                    id:barber.id
                },
                data:{
                    images:updatedImages
                }
            }
            )
        return updatedImages
    } catch (error:any) {
        throw new Error(`Failed to delete images,try again later`)
    }
}

export const addImagesTobarber = async(
    {
        userId,
        barberId,
        images
    }:{
        userId:string;
        barberId:string;
        images:string[];
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
        if(!user) throw new Error(`No user found`)
        if(user.barberId !== barberId) throw new Error(`This user is not the barber of this salon`)
        const barber = await prisma.barber.findUnique(
            {
                where:{
                    id:barberId
                },
                select:{
                    images:true
                }
            }
                )
        if(!barber) throw new Error(`No barber found`)
        const newImages = [...barber.images,...images]
        const updatedBarber = await prisma.barber.update(
            {
                where:{
                    id:barberId
                },
                data:{
                    images:newImages
                },
                select:{
                    images:true
                }
            }
        )
        return updatedBarber
    } catch (error) {
        throw new Error(`Failed to add images`)
    }
}

export const changeSalonInfo = async({
    userId,barberId,salonInfo
}:{
    userId:string;
    barberId:string;
    salonInfo:{
        salonName:string;
        number:string;
    }
}) =>{

    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            },
            select:{
                id:true,
                barberId:true
            }
        })
        if(!user) throw new Error(`Couldnt find user`)
        if(user.barberId !== barberId) throw new Error(`The user is not the owner of this salon`)
        const barber = await prisma.barber.findUnique(
        {
            where:{
                id:barberId
            }
        })
        if(!barber) throw new Error(`Failed to find barber`)
        const updatedBarber = await prisma.barber.update(
            {
                where:{
                    id:barberId
                },
                data:{
                    salonName:salonInfo.salonName,
                    phoneNumber:`+212${salonInfo.number}`
                },
                select:{
                    salonName:true,
                    phoneNumber:true
                }
            }
        )
        return updatedBarber
    } catch (error) {
        throw new Error(`Failed to save,try again later`)
    }
}

export const changeSalonLocation = async({
    userId,barberId,location
}:{
    userId:string;
    barberId:string;
    location:{
        city:string;
        mapLocation:{
            latitude:number,
            longitude:number
        },
        address:string
    }
}) =>{

    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            },
            select:{
                id:true,
                barberId:true
            }
        })
        if(!user) throw new Error(`Couldnt find user`)
        if(user.barberId !== barberId) throw new Error(`The user is not the owner of this salon`)
        const barber = await prisma.barber.findUnique(
        {
            where:{
                id:barberId
            }
        })
        if(!barber) throw new Error(`Failed to find barber`)
        const updatedBarber = await prisma.barber.update(
            {
                where:{
                    id:barberId
                },
                data:{
                    city:location.city,
                    address:location.address,
                    latitude:location.mapLocation.latitude,
                    longitude:location.mapLocation.longitude
                },
                select:{
                    city:true,
                    address:true,
                    latitude:true,
                    longitude:true
                }
            }
        )
        return updatedBarber
    } catch (error) {
        throw new Error(`Failed to save,try again later`)
    }
}

export const ChangeSalonPrefer = async(
    {
        userId,
        barberId,
        preferences
    }:{
        userId:string;
        barberId:string;
        preferences:{
            prices:number[],
            dates:string[],
            time:string[],
            holiday:boolean
        }
    }
) => {

    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            },
            select:{
                id:true,
                barberId:true
            }
        })
        if(!user) throw new Error(`Couldnt find user`)
        if(user.barberId !== barberId) throw new Error(`The user is not the owner of this salon`)
        const barber = await prisma.barber.findUnique(
        {
            where:{
                id:barberId
            }
        })
        if(!barber) throw new Error(`Failed to find barber`)
        const updatedBarber = await prisma.barber.update({
                where:{
                    id:barber.id
                },
                data:{
                    Prices:preferences.prices,
                    holidays:preferences.holiday,
                    time:preferences.time,
                    openDays:preferences.dates
                },
                select:{
                    openDays:true,
                    Prices:true,
                    time:true,
                    holidays:true
                }
        })
        return updatedBarber
    } catch (error) {
        throw new Error(`Failed to save,try again later`)
    }
}