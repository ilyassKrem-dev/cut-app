"use client"
import ImageButtons from "./misc/imageButtons";
import { IoMdStar,IoLogoGithub  } from "react-icons/io";
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
       <div className="pb-14">
        <div className="flex gap-6 flex-wrap md:px-6 sm:justify-center xl:justify-start">
            {barbers.map((barber,index) => {
                return (
                    <article 
                    className="group relative w-full sm:max-w-[320px] bg-gradient-to-b from-white/3 to-white/2 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl hover:shadow-2xl/30 transform hover:scale-[1.015] transition-all duration-300 border border-white/5" key={barber.salonName+index}>
                        <div className="relative">
                            <ImageChange images={barber.images} barberId={barber.id}/>
                            <ImageButtons 
                                userId={userId} 
                                barberId={barber.id}
                                barberImage={barber.images[0]}
                                barberName={barber.salonName}
                            />

                            {/* Price badge */}
                            <div className="absolute left-4 top-3 bg-gradient-to-r from-amber-400 to-red-400 text-black font-semibold text-xs px-3 py-1 rounded-full shadow-md">From {barber.Prices[0]} DH</div>
                            {/* Rating */}
                            <div className="absolute left-4 top-12 flex items-center gap-2 bg-black/60 text-white text-sm px-2 py-1 rounded-full">
                                <IoMdStar className="text-yellow-400"/>
                                <span className="font-medium">{barber.ratings?.toFixed?.(1) ?? barber.ratings}</span>
                            </div>
                        </div>

                        <Link href={`/salons/${barber.id}`} className="block px-4 py-3 hover:bg-white/2 transition-colors">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-1 text-sm">
                                    <h3 className="text-lg font-semibold text-white truncate">{barber.salonName}</h3>
                                    <p className="text-white/80 text-sm">{barber.city} <span className="text-white/50 text-xs block">{barber.address}</span></p>
                                    <p className="text-xs text-white/50">{barber.time[0]} - {barber.time[1]}</p>
                                    <div className="mt-1 flex gap-2">
                                        <span className="text-xs text-white/90 bg-white/5 px-2 py-1 rounded">Min {barber.Prices[0]} DH</span>
                                        <span className="text-xs text-white/90 bg-white/5 px-2 py-1 rounded">Max {barber.Prices[1]} DH</span>
                                    </div>
                                </div>
                                <div className="flex items-center pl-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-sm">{barber.salonName.slice(0,1)}</div>
                                </div>
                            </div>
                        </Link>
                    </article>
                )
            })}
        </div>

        {/* Footer for larger screens */}
        <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-full bg-black/60 backdrop-blur-md border border-white/6 hidden md:flex items-center gap-6 z-40">
            <Link href={"https://github.com/ilyassKrem-dev/cut-app"} target="_blank" className="flex gap-2 items-center text-white/80 hover:opacity-80 transition">
                <IoLogoGithub className="text-lg"/> <span className="text-sm underline">Source</span>
            </Link>
            <p className="text-white/70 text-sm">IlyassKrem-dev © 2024</p>
        </footer>
       </div>
    )
}