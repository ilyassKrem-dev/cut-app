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
    const { city, rating, operat, min, max } = filters as any;
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
    
    if(min || max) {
        barbersR = barbersR.filter(barber => {
            const minPrice = parseFloat(min);
            const maxPrice = parseFloat(max);
            if (min && max) {
                return barber.Prices[0] >= minPrice && barber.Prices[1] <= maxPrice;
            }
            if (!min && max) {
                return barber.Prices[1] <= maxPrice;
            }
            if (min && !max) {
                return barber.Prices[0] >= minPrice || barber.Prices[1] >= minPrice;
            }
            return true;
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
                comments:{
                    orderBy:{
                        createdAt:"desc"
                    },
                    select:{
                        id:true,
                        comment:true,
                        stars:{
                            select:{
                                star:true
                            }
                        },
                        user:{
                            select:{
                                name:true,
                                image:true
                            }
                        }
                    }
                }
            }
        })
        if(!barber) {
            throw new Error(`No barber found`)
        }
        const shuffledComments = barber.comments.sort(() => 0.5 - Math.random());
        const selectedComments = {...barber,comments:shuffledComments.slice(0, 5)};

        const barberCommentsChange = selectedComments.comments.map(comment => ({...comment,stars:comment.stars?.star}))
        const barberComments = {...barber,comments:barberCommentsChange}
        const barberRa = barber.ratings.length > 0  ? barberComments.ratings.reduce((sum,rate)=> sum + rate.star,0)/barberComments.ratings.length : 0
        const newBarber = {...barberComments,ratings:{
            people:barberComments?.ratings.length,
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

export const getBarberInfo = async(userId:string) => {

    try {
        const barber = await prisma.barber.findFirst({
            where:{
                userId:userId
            },
            include:{
                comments:true,
                ratings:true,
                user:{
                    select:{
                        phoneNumber:true,
                        id:true,
                        image:true,
                        name:true

                    }
                },
            }
        })
        const barberData = {
            ...barber,
            ratings:{
            people:barber?.ratings.length,
            rating:barber?.ratings && barber?.ratings.reduce((t,a) => t+a.star,0) / barber?.ratings.length || 0
            },
            comments:barber?.comments.length
        }
    
        if(!barber) new Error(`No barber found`)
        return barberData
    } catch (error) {
        throw new Error(`Failed to get salon info`)
    }
}

export const getBarberComments = async(paramId:string) => {
    try {
        const barber = await prisma.barber.findUnique(
            {
                where:{
                    id:paramId
                },
                select:{
                    salonName:true,
                    id:true,
                    images:true,
                    comments:{
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
                }
            }
        )
        if(!barber) throw new Error(`Failed to get barber`)
        const newData = barber.comments.map((comment) => {
            return {...comment,stars:comment.stars?.star}
        })
        const newBarber = {...barber,comments:newData}
        return newBarber
    } catch (error) {
        throw new Error(`Internal server error`)
    }
}