"use client"

import dynamic from "next/dynamic";
const LeafletMap = dynamic(() => import("./Leaftleaf"), { ssr: false });

interface Props {
    locationLat:{
        longitude: number; 
        latitude: number;
    },
    info:{
        name:string
    };
    images:string[];
    time:{
        open:string;
        close:string;
    };
    prices:number[]
}

export default function MapSalon({locationLat,info,images,time,prices}:Props) {


    return (
        <div className="w-full relative !z-30">
             <LeafletMap 
                images={images} 
                mapLocation={locationLat} 
                time={time} 
                prices={prices} 
                nameS={info.name}
            />
        </div>
    )
}


