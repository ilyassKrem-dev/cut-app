import { SetStateAction, useEffect,useRef, useState } from "react";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const DaySelect = dynamic(() => import("./daySelect"),{
    ssr:false,
    loading:() => <Skeleton className="h-[58px] w-full bg-white/10 bg-opacity-65"/>})

const TimeSelect = dynamic(() => import("./timeSelect"),{
    ssr:false,
    loading:() => <Skeleton className="h-[58px] w-full bg-white/10 bg-opacity-65"/>})
export default function Reserve({barberId,userId,setShow,barberTime}:{
    barberId:string;
    userId:string;
    setShow:React.Dispatch<SetStateAction<boolean>>;
    barberTime:{
        times:string[];
        days:string[];
    }
}) {
    const [selectedDay,setSelectedDay] = useState<string>("")
    const [selectedTime,setSelectedTime] = useState<string>("")
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
                                To reserve a slot, simply choose your preferred date and time. We will take care of the rest!
                            </p>
                        </div>
                        <div className="flex gap-6 mt-10 flex-col px-2 md:flex-row">
                            <DaySelect 
                            setSelectedDay={setSelectedDay}
                            selectedDay={selectedDay}
                            barberDays={barberTime.days}/>
                            {selectedDay&&<TimeSelect
                            selectedTime={selectedTime}
                            setSelectedTime={setSelectedTime} 
                            barberTime={barberTime.times}/>}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}