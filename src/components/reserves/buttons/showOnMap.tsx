
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import LoadingAnimation from "@/assets/other/spinner";
const MapLocation = dynamic(() => import("./map"),{
    ssr:false,
    loading:() => {
    return (
        <div className="h-screen justify-center items-center flex">
            <LoadingAnimation />
        </div>
    )
}})
export default function ShowOnMap({coordinates,salonName }:{
    coordinates:{
        lat:number;
        long:number
    };
    salonName:string
}) {
        const [showMap,setShowMap] = useState<boolean>(false)
        useEffect(() => {
            const outOfBound = (e:MouseEvent) => {
                const overlay = document.querySelector(".map-tab")
                if(overlay && !overlay.contains(e.target as any)) {
                    setShowMap(false)
                }
            }
            document.body.addEventListener("click",outOfBound)
    
            return () => document.body.removeEventListener("click",outOfBound)
        },[])
        return (
            <>
                <button className="bg-green-1/50 bg-opacity-70 text-white hover:bg-green-1/60 transition-all duration-300  py-2 hover:opacity-60 active:bg-green-1/40   flex-1" onClick={() => setShowMap(true)}>Show on map</button>
                {showMap&&<div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center flex-col bg-black/60">
                    <MapLocation 
                    coordinates={coordinates} 
                    salonName={salonName}/>

                </div>}
            </>
        )
}