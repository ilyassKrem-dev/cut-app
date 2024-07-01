import { SetStateAction, useEffect,useRef, useState } from "react";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import HandleReserve from "./handleReserver";
import Link from "next/link";
const DaySelect = dynamic(() => import("./daySelect"),{
    ssr:false,
    loading:() => <Skeleton className="h-[58px] w-full bg-white/10 bg-opacity-65"/>})

const TimeSelect = dynamic(() => import("./timeSelect"),{
    ssr:false,
    loading:() => <Skeleton className="h-[58px] w-full bg-white/10 bg-opacity-65"/>})
const PriceSelect = dynamic(() => import("./priceSelect"),{
    ssr:false,
    loading:() => <Skeleton className="h-[58px] w-full bg-white/10 bg-opacity-65"/>})

export default function Reserve({barberReserves,barberId,userId,setShow,barberTimeAprice}:{
    barberReserves:any[];
    barberId:string;
    userId:string;
    setShow:React.Dispatch<SetStateAction<boolean>>;
    barberTimeAprice:{
        times:string[];
        days:string[];
        prices:number[]
    }
}) {
    
    const [selectedDay,setSelectedDay] = useState<string>("")
    const [selectedTime,setSelectedTime] = useState<string>("")
    const [selectedPrice,setSelectedPrice] = useState<number>(0)
    const [convoId,setConvoId] = useState<string>("")
    const [success,setSuccess] = useState<boolean>(false)
    useEffect(() => {
        const handleOutsideClick = (e:MouseEvent) => {
            const overlay = document.querySelector(".reserve-tab");
            if(overlay && !overlay.contains(e.target as any)) {
                setShow(false)
            }
        }
        document.body.addEventListener('click',handleOutsideClick)

        return () => document.body.removeEventListener("click",handleOutsideClick)
    },[])

    
    return(
        <>
            {!success
            ?
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/60 z-50 flex flex-col justify-end no-doc-scroll md:justify-center md:items-center">
                <div className="bg-black rounded-t-2xl border-t border-t-white/10 h-[80%] flex flex-col reserve-tab md:w-full md:max-w-[700px] md:h-fit md:rounded-2xl md:border-white/10">
                    <div className="flex justify-center p-4 border-b border-white/10 items-center">
                        <div className=" flex-1" onClick={() => setShow(false)}>
                            <div className="text-xl font-semibold border rounded-full px-[0.7rem] py-[0.3rem]  cursor-pointer hover:opacity-60 hover:bg-white hover:text-black transition-all duration-300 active:opacity-40 border-white/10 w-fit" onClick={() => setShow(false)}>
                            x
                            </div>
                               
                        </div>
                        <div className="flex-1 text-center text-lg ">
                            Reserve
                        </div>
                        <div className="flex-1" />

                   
                    </div>
                    <div className="flex flex-col justify-center p-4 gap-4">
                        <div className="flex flex-col items-center gap-4">
                            <p className="text-center text-base ">Reserve a date and time to get your haircut</p>
                            <p className="text-white/40 text-xs text-center">
                                To reserve a barber, simply choose your preferred date and time. We will take care of the rest!
                            </p>
                        </div>
                        <div className="flex gap-6 mt-10 flex-col px-2">
                            <div className="flex gap-6 flex-col md:flex-row">
                                <DaySelect
                                setSelectedDay={setSelectedDay}
                                selectedDay={selectedDay}
                                barberDays={barberTimeAprice.days}/>
                                <TimeSelect
                                reserved={barberReserves}
                                selectedDay={selectedDay}
                                selectedTime={selectedTime}
                                setSelectedTime={setSelectedTime} 
                                barberTime={barberTimeAprice.times}/>

                            </div>
                            {selectedTime && selectedDay?<PriceSelect
                            barberPrices={barberTimeAprice.prices} 
                            selectedPrice={selectedPrice}
                            setSelectedPrice={setSelectedPrice}
                            />:
                            <div className="h-[88px]"/>}
                        </div>
                        <HandleReserve
                        barberPrices={barberTimeAprice.prices}
                        ids={{
                            userId,
                            barberId
                        }}
                        day={selectedDay}
                        time={selectedTime}
                        price={selectedPrice}
                        setShow={setShow}
                        setSuccess={setSuccess}
                        setConvoId={setConvoId}/>
                    </div>
                </div>

            </div>
            :
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/60 z-50 flex flex-col justify-end no-doc-scroll md:justify-center md:items-center">
                <div className="bg-black rounded-t-2xl border-t border-t-white/10 h-[80%] flex flex-col reserve-tab md:w-full md:max-w-[700px] md:rounded-2xl md:border-white/10 md:h-[450px]">
                    <div className="flex justify-center p-4 border-b border-white/10 items-center">
                        <div className=" flex-1" onClick={() => setShow(false)}>
                            <div className="text-xl font-semibold border rounded-full px-[0.7rem] py-[0.3rem]  cursor-pointer hover:opacity-60 hover:bg-white hover:text-black transition-all duration-300 active:opacity-40 border-white/10 w-fit" onClick={() => setShow(false)}>
                            x
                            </div>
                               
                        </div>
                        <div className="flex-1 text-center text-lg ">
                            Reserved
                        </div>
                        <div className="flex-1" />

                   
                    </div>
                    <div className="flex flex-col justify-between p-4 gap-4 flex-1">
                        <div className=" flex-1 justify-center items-center flex">
                            <p className="text-center text-base text-white/70">See reservation or talk to the barber</p>
                            
                        </div>
                        <div className="border-t border-white/20 p-4 flex justify-between gap-3">
                            <Link className="flex-1" href={`/reserves`}>
                                <Button className="w-full bg-black/80 
                                border border-white
                                hover:bg-white/40 transition-all duration-300
                                hover:text-black active:bg-white/60  hover:opcity-60">
                                    Reservations
                                </Button>
                            </Link>
                            <Link className="flex-1" href={convoId ? `/messages/${convoId}`:"#"}>
                                <Button className="w-full bg-green-1/80 hover:bg-green-1/60 transition-all duration-300 active:bg-green-1/50  hover:opcity-60">
                                    Message
                                </Button>
                            </Link>
                           
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}