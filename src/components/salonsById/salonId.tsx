
import Image from "next/image";
import { FaCalendar, FaCheck, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import dynamic from "next/dynamic";
import LoadingAnimation from "@/assets/other/spinner";
import BarberImages from "./assets/barberImages";
import SalonButtons from "./assets/buttons";
import AboveView from "./assets/aboveImages/aboveView";
import { Button } from "../ui/button";
import RatingsACommentes from "./assets/ratingsComment/rAndC";
import {SalonType,CommentsType} from "./salonType"
import BarberComments from "./assets/barberComments";
import Link from "next/link";
import { IoLogoGithub } from "react-icons/io";

const MapSalon = dynamic(() => import("./assets/mapSalon"), { ssr: false,loading:() => (
    <div className="h-[500px]">
        <LoadingAnimation/>
    </div>
) });


interface Props {
    barber:SalonType | undefined;
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
                    <div className="px-4 flex-1 max-w-[1200px]">
                        <div>
                            <h1 className="font-bold text-2xl">{barber?.salonName}</h1>
                            <p className="max-w-[400px] text-gray-400 text-sm">{barber?.city}</p>
                        </div>
                        <RatingsACommentes 
                        rating={barber?.ratings.rating}
                        nmbreComment={barber?.comments.length as number}
                        userId={userId}
                        barberId={barber?.id as string}
                        show={pathname}
                        barberUserId={barber?.userId as string}/>
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
                    {!pathname&&barber?.id !== barberUserId?<SalonButtons 
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
            {!pathname&&barber?.comments.length !== 0?
            <div className="w-full flex flex-col border-t my-9 py-5 gap-10 items-center border-white/20">
                <h1>Comments</h1>
                <BarberComments comments={barber?.comments as CommentsType[]}/>
                
                {(barber?.comments.length as number) > 4 && 
                <Link href={`/salons/${barber?.id}/comments`} className="underline text-sm">
                    More comments..
                </Link>}
            </div>
            :
            <div className="w-full flex flex-col border-y my-9 py-5 gap-10 items-center border-white/20">
                <h1>Comments</h1>
                <p className="text-xl">No comments</p>
            </div>}
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
            {!pathname&&<div className="fixed bottom-0 right-0 left-0 p-3  justify-center items-center border-t gap-20 border-white/10 hidden md:flex z-50 bg-black">
                <Link href={"https://github.com/ilyassKrem-dev/cut-app"} target="_blank" className=" underline text-white/80 text-sm flex gap-2 items-center hover:opacity-70 transition-all duration-300 active:opacity-60">
                    Source code <IoLogoGithub />
                </Link> 
                <p className="text-center">IlyassKrem-dev &copy; 2024</p>
            </div>}
        </div>
    )
}