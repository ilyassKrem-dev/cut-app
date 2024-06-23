

import Image from "next/image";
import { FaCalendar, FaCheck, FaMapMarkerAlt, FaPhoneAlt,FaStar } from "react-icons/fa";

import dynamic from "next/dynamic";
import LoadingAnimation from "@/assets/other/spinner";
import BarberImages from "./assets/barberImages";

import SalonButtons from "./assets/buttons";
import AboveView from "./assets/aboveImages/aboveView";
import { Button } from "../ui/button";
const MapSalon = dynamic(() => import("./assets/mapSalon"), { ssr: false,loading:() => (
    <div className="h-[500px]">
        <LoadingAnimation/>
    </div>
) });
interface Props {
    barber:{
        id:string;
        userId:string;
        address:string;
        city:string;
        latitude: number;
        longitude: number;
        time: string[];
        openDays:string[];
        holidays: boolean |null;
        Prices: number[];
        phoneNumber: string | null;
        images: string[];
        salonName: string;
        ratings: { 
            people: number, 
            rating: number }
        user:{
            name:string;
            image:string | null;
            phoneNumber:string | null
        },
        comments:any
    } | undefined;
    userId:string |null |undefined;
    pathname?:string;
    barberUserId?:string
}

export default function SalonId({barber,userId,pathname,barberUserId}:Props) {
    
    const datesCheck = barber?.openDays.length === 7 ? "Entire week" : barber?.openDays.join("-")
    return (
        <div className="sm:px-4 pb-24">
            {!pathname&&<div className="md:pt-28">
                <AboveView 
                userId={userId} 
                barberId={barber?.id}
                barberImage={barber?.images[0] as string}
                barberName={barber?.salonName as string}/>
            </div>}
            <div className="flex flex-col gap-10">
                <div className="">
                    <BarberImages barberImages={barber?.images}/>
                </div>
                
                <div className="flex justify-between">
                    <div className="px-4 flex-1 max-w-[650px]">
                        <div>
                            <h1 className="font-bold text-2xl">{barber?.salonName}</h1>
                            <p className="max-w-[400px] text-gray-400 text-sm">{barber?.city}</p>
                        </div>
                        <div className="border-white/20 border rounded-lg  mt-4 justify-center flex items-center">
                            <div className=" max-[300px]:px-6 flex  gap-2 py-8 px-8 md:py-8 md:px-16 flex-1 justify-center items-center">    
                                <FaStar className="text-2xl text-white/30"/>
                                <p className="text-lg">{barber?.ratings.rating}</p>
                            </div>
                            <div className="w-px   border border-white/20 h-[96px] max-h-full"/>

                            
                            <div className="max-[300px]:px-6 px-8 md:py-8 md:px-16 flex flex-col items-center flex-1 justify-center ">
                                <p className="max-[300px]:text-sm">Comments</p>
                                <p className="text-sm text-white/30">{barber?.comments.length}</p>
                            </div>
                        </div>
                        <div className="border-y my-9 py-5 flex gap-4 items-center border-white/20">
                            <Image 
                            src={barber?.user.image || "/profile.jpg"}
                            alt={`barber ${barber?.user.name} pic`}
                            width={100}
                            height={100}
                            className="w-[40px] h-[40px] rounded-full"
                            />
                            <div className="flex flex-col">
                                <p className="font-semibold capitalize">Barber : {barber?.user.name}</p>
                                <p className="text-sm text-gray-400">{barber?.user.phoneNumber || ""}</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-8 justify-center">
                            <div className="flex gap-2 items-center">
                                <FaMapMarkerAlt  className="text-2xl text-white/50"/>
                                <p>{barber?.address}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <FaPhoneAlt  className="text-2xl text-white/50"/>
                                <p>{barber?.phoneNumber}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <FaCalendar  className="text-2xl text-white/50"/>
                                <div className="flex gap-1 flex-col">
                                    <p>{datesCheck}</p>
                                    <div className="flex gap-2 items-center">Holidays:{barber?.holidays?<FaCheck />:<span className="text-xl font-bold text-gray-400">x</span>}</div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    {!pathname?<SalonButtons 
                    barberPrices={barber?.Prices as number[]}
                    userId={userId}
                    barberId={barber?.id as string}
                    barberUserId={barberUserId}
                    barberTimeAprices={{
                        times:barber?.time as string[],
                        days:barber?.openDays as string[],
                        prices:barber?.Prices as number[]
                    }}
                    />
                    :
                    <div className="hidden md:flex flex-1 max-w-[400px] h-fit mt-10">
                            <div className="bg-black border border-white/20 rounded-lg flex justify-center p-3 py-6 flex-col gap-8  items-center w-full shadow-[0px_0px_4px_1px_rgba(255,255,255,0.2)]">
                                <div className="text-center">
                                    <p className="font-bold text-xl">{barber?.Prices[0]}DH - {barber?.Prices[1]}DH</p>
                                    <p className="text-sm mt-1 text-gray-400">
                                        {barber?.time[0]}-{barber?.time[1]}
                                        
                                    </p>
                                </div>
                                <Button className="bg-green-1  hover:opacity-100 hover:bg-green-1 w-full">Talk</Button>
                            </div>
                    </div>}
                </div>
            </div>
            <div className="border-y my-9 py-5 flex gap-4 items-center border-white/20 mx-4 justify-center">
                <MapSalon 
                    prices={barber?.Prices as number[]}
                    locationLat={
                        {longitude: barber?.longitude as number,
                        latitude: barber?.latitude as number}
                    }   
                    info={
                        {
                            name:barber?.salonName as string,
                
                        }
                    }
                    images={barber?.images as string[]}
                    time={{
                        open:barber?.time[0] as string,
                        close:barber?.time[1] as string
                    }}
                />
            </div>
        </div>
    )
}