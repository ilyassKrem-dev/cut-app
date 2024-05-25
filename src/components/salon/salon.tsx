"use client"
import { useEffect, useState } from "react";
import NoSalon from "./misc/noSalon";
import LoadingAnimation from "@/assets/other/spinner";
interface Props {
    userId:string | undefined
}

export default  function Salon({userId}:Props) {
    const [salon,setSalon] = useState<any|null>(null)
    
    useEffect(() => {
        const getSalon = async() => {
            try {
                
            } catch (error) {
                setSalon(false)
            }
        }
    },[])
    if(salon == null) {
        return (
        <div className="md:pt-0 h-screen">
                    <LoadingAnimation/>
        </div>)
    }
    return (
        <div>
            {!salon
            ?
            <NoSalon userId={userId as string} />
            :
            ""}
        </div>
    )
} 