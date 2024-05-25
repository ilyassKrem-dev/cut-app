"use server"

import { PrismaClient } from "@prisma/client/edge"

const prisma = new PrismaClient()

interface Info {
    name:string;
    phone:string,
    images:string[]
}
interface locationInfo {
    city:string;
    address:string;
    mapLocation:{
        longitude:number,
        latitude:number
    }
}
interface Prefernces {
    value:number[];
    time:{
        open:string;
        close:string;
    },
    dates:{
        week:string[];
        holidays:boolean
    }
}
interface paramsB {
    userId:string
    info:Info
    locationInfo:locationInfo
    prefernces:Prefernces

}

export const addBarber = async({userId,info,locationInfo,prefernces}:paramsB) => {
    try {
        
        const barber = await prisma.barber.create({
            data:{
                user:{connect:{
                    id:userId
                }},
                address:locationInfo.address,
                city:locationInfo.city,
                latitude:Number(locationInfo.mapLocation.latitude),
                longitude:Number(locationInfo.mapLocation.longitude),
                time:[
                    prefernces.time.open,prefernces.time.close
                ],
                openDays:prefernces.dates.week,
                holidays:prefernces.dates.holidays,
                Prices:prefernces.value,
                phoneNumber:"+212"+info.phone,
                images:info.images,
                salonName:info.name,
                

            }
        })
        if(!barber) return {succuss:false}
        await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                barberId:barber.id
            }
        })
        return {succuss:true}
    } catch (error:any) {
        throw new Error(`Error set up the salon ${error.message}`)
    }
}

interface FiltersProps {
    filters:{
        city:string | undefined;
        rating:string | undefined;
        operat:string | undefined;
        min:string|undefined;
        max:string|undefined

    }
}
export const allBarbers = async({filters}:FiltersProps) => {
    const { city, rating, operat, min, max } = filters;
    const normalizedCity = city ? city : undefined;

    
    const whereClause: any = {
        city: normalizedCity,
    };
    
    let barbers = await prisma.barber.findMany(
        {
            where:whereClause,
            select:{
               
                id:true,
                city:true,
                salonName:true,
                images:true,
                latitude:true,
                longitude:true,
                time:true,
                Prices:true,
                address:true,
                ratings:true
            }
           
            
        }
        
    )
    let barbersR = barbers.map(barber => {
        const barberRa = barber.ratings.length > 0  ? barber.ratings.reduce((sum,rate)=> sum + rate.star,0)/barber.ratings.length : 0
        return {...barber,ratings:barberRa}
    })
    
    if(min && max) {
        barbersR = barbersR.filter(barber => {
            if(min !== "0" && max !== "0") {
                return barber.Prices[0] >= parseFloat(min) && barber.Prices[1] <= parseFloat(max)
            }
            if(min == "0" && max !== "0") {
                return  barber.Prices[1] <= parseFloat(max)
            }
            if(min != "0" && max == "0") {
                return  barber.Prices[0] >= parseFloat(max)
            }
            return barber
        })
    }
    if(rating && operat) {
        if(rating !== "null") {
            
            const filtersD = barbersR.filter(barber => {
                
                
                
                switch (operat) {
                    case "same":
                        
                        return barber.ratings == Number(rating)
                        
                    case "null":
                        return barber.ratings >= Number(rating)
                        
                    case "below":
                        return barber.ratings < Number(rating)
                        
                    case "above":
                        return barber.ratings > Number(rating)
                    default:
                        return false;
                }
            })
            barbersR = filtersD
        }
    }
    return barbersR
}

export const fetchbarberExistence = async(userId:string) => {
    const babrer = await prisma.barber.findUnique({
        where:{
            userId:userId
        }
    })
    if(!babrer) return {success:false}
    return {success:true}
}


export const getBaberById = async(barberId:string) => {
    try {
        const barber = await prisma.barber.findUnique({
            where:{
                id:barberId
            },
            include:{
                ratings:true,
                user:{
                    select:{
                        name:true,
                        image:true,
                        phoneNumber:true
                    }
                },
                comments:true
            }
        })
        if(!barber) {
            throw new Error(`No barber found`)
        }
        const barberRa = barber.ratings.length > 0  ? barber.ratings.reduce((sum,rate)=> sum + rate.star,0)/barber.ratings.length : 0
        const newBarber = {...barber,ratings:{
            people:barber?.ratings.length,
            rating: barberRa

        }}

        return newBarber
    } catch (error:any) {
        throw new Error(`Failed to get the barber ${error.message}`)
    }
}


export const talkToBarber = async(
    {
        userId,
        barberId
    }:{
        userId:string;
        barberId:string
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
        if(!user) return {error:"No user Found"}
        const barber = await prisma.barber.findUnique({
            where:{
                id:barberId,
            }
        })
        if(!barber) return {error:"No barber found"}
        if(user.barberId == barber.id) return {message:"You are the barber"}
        const convo = await prisma.convo.findFirst({
            where: {
              participants: {
                some: {
                  userId: userId,
                  barberId: barberId,
                },
              },
            },
          });
        if(convo) return {success:convo.id}
        const newConvo = await prisma.convo.create({
            data:{
                participants:{
                    create:[
                        {
                            user:{
                                connect:{
                                    id:user.id
                                }
                            },
                            barber:{
                                connect:{
                                    id:barber.id
                                }
                            }
                        }
                    ]
                }
            }
        })
        return {success:newConvo.id}
    } catch (error:any) {
        throw new Error(`Failed to continue ${error.message}`)
    }
}