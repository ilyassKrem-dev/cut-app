"use client"
import { Button } from "@/components/ui/button";
import { useLoginContext } from "@/assets/wrappers/loginWrapper";
import { useEffect, useState } from "react";
import Reserve from "./reservation/reserve";
import { getReservations } from "@/lib/actions/reservation.action";


export default function SalonButtons({barberPrices,userId,barberId,barberUserId,barberTimeAprices}:{
    barberPrices:number[];
    userId:string|null|undefined;
    barberId:string;
    barberUserId?:string;
    barberTimeAprices:{
        times:string[];
        days:string[];
        prices:number[];
    }
}) {
    const [barberReserv,setBarberReserv] = useState<any[]>([])
    const {setShowLogin} = useLoginContext()
    const [show,setShow] = useState<boolean>(false)
    useEffect(() => {
        if(!userId) return
        const fetchResev = async() => {
            try {
                const res = await getReservations({
                    barberId
                })
                if(res) setBarberReserv(res)
            } catch (error) {
                
            }
        }
        fetchResev()
    },[userId,barberId])
    const handleClick = async() => {
        if(!userId) {
            return setShowLogin(true)
        }
        setShow(true)
    }


    return (
        <>
            <div className="hidden sm:flex flex-1 max-w-[400px] h-fit">
                <div className="bg-black border border-white/20 rounded-lg flex justify-center p-3 py-6 flex-col gap-8  items-center w-full shadow-[0px_0px_4px_1px_rgba(255,255,255,0.2)]">
                    <div className="text-center">
                        <p className="font-bold text-xl">{barberPrices[0]}DH - {barberPrices[1]}DH</p>
                        <p className="text-sm mt-1 text-gray-400">
                            {barberTimeAprices.times[0]}-{barberTimeAprices.times[1]}
                            
                        </p>
                    </div>
                    <Button onClick={handleClick} className="bg-green-1  hover:opacity-80 hover:bg-green-1 w-full">Reserve</Button>
                </div>
            </div>
            <div className="sm:hidden fixed z-50 bottom-0 right-0 left-0 bg-black">
                <div className="flex justify-between items-center px-4 py-3 ">
                    <div className="flex flex-col flex-1 max-[331px]:text-sm">
                        <p className="font-bold">{barberPrices[0]}DH - {barberPrices[1]}DH</p>
                        <p className="text-xs mt-1 text-gray-400">
                            {barberTimeAprices.times[0]}-{barberTimeAprices.times[1]}
                        </p>

                    </div>
                    {userId !== barberUserId&&<Button onClick={handleClick}  
                    className="bg-green-1  hover:opacity-80 hover:bg-green-1 flex-1">Reserve</Button>}
                </div>
            </div>
            {show&&<Reserve
            barberReserves={barberReserv}
            barberTimeAprice={barberTimeAprices}
            barberId={barberId} 
            userId={userId as string}
            setShow={setShow}/>}
        </>
    )

        
}