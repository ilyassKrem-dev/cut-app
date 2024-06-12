"use client"
import { useEffect, useState } from "react";
import NoSalon from "./misc/noSalon";
import LoadingAnimation from "@/assets/other/spinner";
import { getBarberInfo } from "@/lib/actions/barber.action";
import HubSalon from "./misc/hubSalon";

interface Props {
    userId:string | undefined
}

interface salonType {
        id:string;
        prices:string[];
        city:string;
        comments:number;
        holidays:boolean;
        images:string[];
        latitude:number;
        longitude:number;
        openDays:string[];
        phoneNumber:string;
        ratings: { 
            people: number, 
            rating: number 
        }
        salonName:string;
        time:string[];
        userId:string;
        user:{
            id:string;
            phoneNumber:string;
            image:string|null;
            name:string
        }
}
export default  function Salon({userId}:Props) {
    const [salon,setSalon] = useState<salonType|null |boolean>(null)
    
    useEffect(() => {
        const getSalon = async() => {
            try {
                const res = await getBarberInfo(userId as string)
                
                if(res) setSalon(res as any)
            } catch (error) {
                setSalon(false)
            }
        }
        getSalon()
    },[])

    if(salon == null) {
        return (
        <div className="md:pt-0 h-screen">
                    <LoadingAnimation/>
        </div>)
    }
    return (
        <div className="h-full">
            {!salon
            ?
            <NoSalon userId={userId as string} />
            :
            <HubSalon 
            salon={salon as salonType} 
            userId={userId as string}
            setSalon={setSalon} />}
        </div>
    )
} 