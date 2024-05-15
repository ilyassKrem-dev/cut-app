
import { SetStateAction, useState } from "react";


import { Button } from "@/components/ui/button";
import CityS from "./locations/cityS";
import AddressS from "./locations/addressS";
import MapS from "./locations/mapS";
import { checkLocation } from "../../other/checkInfo";
interface locationInfo {
    city:string;
    address:string;
    mapLocation:{
        longitude:number,
        latitude:number
    }
}
interface Props {
    locationInfo:locationInfo;
    setLocationInfo:React.Dispatch<SetStateAction<locationInfo>>;
    setNowStep:React.Dispatch<SetStateAction<number>>;
    setMapChanged:React.Dispatch<SetStateAction<boolean>>
    mapChanged:boolean
}

export default function LocationS({locationInfo,setLocationInfo,setNowStep,setMapChanged,mapChanged}:Props) {
    const toNext = checkLocation(locationInfo,mapChanged)
    const handleNext = () => {
        if(!toNext) return
        setNowStep(4)
    }
    return (
        <div className="flex items-center flex-col gap-5 pb-12">
            <div className="flex items-center justify-center flex-col gap-2  py-6 text-light w-full">
                <h1 className="text-xl font-semibold">Info</h1>
                <p className="text-sm">Set up your salon info</p>
            </div>
            <div className="w-full px-4 flex flex-col gap-10 items-center">
                <div className="w-full md:border rounded-lg flex flex-col gap-8 md:p-6 border-white/20 md:gap-12">
                    <CityS 
                    city={locationInfo.city} 
                    setLocationInfo={setLocationInfo}/>
                    <AddressS 
                    address={locationInfo.address} 
                    setLocationInfo={setLocationInfo}/>
                    <MapS 
                    mapLocation={locationInfo.mapLocation} 
                    setLocationInfo={setLocationInfo}
                    setMapChanged={setMapChanged}
                    mapChanged={mapChanged}
                    />
                    
                </div>
                <Button
                onClick={handleNext}
                className="w-full md:max-w-[500px] bg-green-1/80 hover:bg-green-1/20 transition-all duration-300" disabled={!toNext}>Next</Button>
            </div>
        </div>
    )
}