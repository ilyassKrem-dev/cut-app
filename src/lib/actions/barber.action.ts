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
                salonName:info.name

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