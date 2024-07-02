
import ImageButtons from "./misc/imageButtons";
import { IoMdStar } from "react-icons/io";
import ImageChange from "./misc/imageChange";
import Link from "next/link";

interface Props {
    userId:string | null
    barbers:{
        id: string; 
        address: string; 
        city: string;
        images:string[];
        latitude: number; 
        longitude: number; 
        time: string[]; 
        Prices: number[]; 
        salonName: string; 
        ratings: number
    }[]
}

export default function Home({userId,barbers}:Props) {
    
    return (
       <div className="">
        <div className="flex gap-6 flex-wrap md:px-3 sm:justify-center xl:justify-start">
            {barbers.map((barber,index) => {
                return (
                    <div 
                    className="flex   gap-3 flex-col 
                    w-full sm:max-w-[280px] cursor-pointer" key={barber.salonName+index}>
                        <div className="w-full h-full relative">
                            <ImageChange images={barber.images} barberId={barber.id}/>
                            <ImageButtons 
                            userId={userId} 
                            barberId={barber.id}
                        
                            barberImage={barber.images[0]}
                            barberName={barber.salonName}/>
                        </div>
                        <Link 
                        href={`/salons/${barber.id}`} className="flex justify-between items-start">
                            <div className="flex flex-col gap-1 text-sm">
                                <h3 className="font-semibold cursor-pointer">{barber.salonName}</h3>
                                <p className="text-white/90 cursor-pointer">{barber.city}, <span className="text-white/50 text-xs ">{barber.address}</span></p>
                                <p className="text-xs text-white/50 cursor-pointer">{barber.time[0]}-{barber.time[1]}</p>
                                <div className="text-white/90 text-xs cursor-pointer">
                                    <p className="cursor-pointer">From {barber.Prices[0]} DH</p>
                                    <p className="cursor-pointer">To {barber.Prices[1]} DH</p>
                                </div>
                            </div>
                            <div className="flex gap-1 items-center cursor-pointer">
                                <IoMdStar className="text-lg"/>
                                <p className="text-sm cursor-pointer">{barbers[0].ratings}</p>
                            </div>
                        </Link>
        
                    </div> 
                )
            })}
            
        </div>
       </div> 
    )
}