"use client"

import { SetStateAction, useEffect, useState } from "react"

import { allBarbers } from "@/lib/actions/barber.action"
import dynamic from "next/dynamic";
import LoadingAnimation from "@/assets/other/spinner";
const Homemap = dynamic(() => import("./homeMap"), { ssr: false,loading:() =><div className="fixed top-0 left-0 right-0  flex justify-center items-center bottom-0"><LoadingAnimation /> </div>});
export default function ShowHomeMap({setShowMap}:{
    setShowMap:React.Dispatch<SetStateAction<boolean>>
}) {
    const [barbers,setBarbers] = useState<any[]|null>(null)
    useEffect(() => {
        const fetchBarbers =async ( ) => {
            try {
                const res = await allBarbers({
                    filters:{
                    city:undefined,
                    rating:undefined,
                    operat:undefined,
                    min:undefined,
                    max:undefined},
                })
                if(!res) return setBarbers([])
                setBarbers(res)
            } catch (error) {
                setBarbers([])
            }
        }
        fetchBarbers()
    },[])
    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".map-home-over");
          if (overlay && !overlay.contains(event.target)) {
            
            setShowMap(false);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 z-[9999] flex justify-center items-center bg-black/80 ">
            <div className="w-full map-home-over">
                {
                        barbers!==null&&<Homemap barbers={barbers}/>
                }

            </div>
        </div>
    )
}