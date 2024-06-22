import { Button } from "@/components/ui/button";
import { SetStateAction, useEffect, useState } from "react"
import { FaArrowLeft } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md"
import TimePicker from "./assets/timePicker";



export default function TimeSelect({selectedTime,setSelectedTime,barberTime}:{
    barberTime:string[];
    selectedTime:string;
    setSelectedTime:React.Dispatch<SetStateAction<string>>
}) {
    const [windowSize,setWindowSize] = useState<number>(window.innerWidth)
    const [showTime,setShowTime] = useState<boolean>(false)
    const [continueToMinute,setContinueToMinute] = useState<boolean>(false)
    const [fullTime,setFullTime] = useState<string>("")
    const handleBack = () => {
        if(continueToMinute) return setContinueToMinute(false)
        setShowTime(false)
        setFullTime("")
        if(selectedTime) return
        setSelectedTime("")
        setContinueToMinute(false)
        setFullTime("")
    }
    useEffect(() => {
        const changedWidth = () => {
            setWindowSize(window.innerWidth)
        }
        window.addEventListener("resize",changedWidth)

        return () => window.removeEventListener("resize",changedWidth)
        
    },[windowSize])
    useEffect(() => {
        const handleOutsideClick = (e:MouseEvent) => {
            const overlay = document.querySelector(".time-tab");
            if(overlay && !overlay.contains(e.target as any)) {
                handleBack()
            }
        }
        document.body.addEventListener('click',handleOutsideClick)

        return () => document.body.removeEventListener("click",handleOutsideClick)
    },[])

    return (
        <>
            {windowSize <767 
                ?
                <>
                    <div className="relative border-white/20 border rounded-lg flex justify-between p-4 items-center cursor-pointer hover:bg-white/30 hover:opacity-80 transition-all duration-300" onClick={() =>setShowTime(true)}>
                        <div className="flex justify-center items-center " >
                            Time
                        </div>
                        {!selectedTime?<div className="flex gap-1 items-center">
                            <p className="text-white/70">Choose a Time</p>
                            <MdArrowForwardIos className="text-white/70"/>
                        </div>
                        :
                        <div className="flex gap-1 items-center">
                            <p className="text-white/70">{selectedTime}</p>
                        </div>}
                        
                    </div>
                   {showTime&&<div className="fixed top-0 left-0 right-0 bottom-0 bg-black/60 z-50 flex flex-col justify-end no-doc-scroll md:justify-center md:items-center">
                        <div className="bg-black rounded-t-2xl border-t border-t-white/10 h-[80%] flex flex-col reserve-tab md:w-full md:max-w-[800px] md:h-fit md:rounded-2xl md:border-white/10 time-tab overflow-y-scroll custom-scrollbar">
                            <div className="flex justify-center p-4 border-b border-white/10 items-center fixed  right-0 left-0 z-50 bg-black">
                                <div className=" flex-1" onClick={handleBack}>
                                    <div className=" font-semibold border rounded-full px-[0.7rem] py-[0.7rem]  cursor-pointer hover:opacity-60 hover:bg-white hover:text-black transition-all duration-300 active:opacity-40 border-white/10 w-fit" onClick={() => handleBack()}>
                                        <FaArrowLeft className="text-sm"/>
                                    </div>
                                    
                                </div>
                                <div className="flex-1 text-center text-lg ">
                                    Time
                                </div>
                                <div className="flex-1" />

                        
                            </div>
                            <div className="flex gap-7 flex-col p-4 mt-6 h-full">
                                <div className="text-center">
                                    <p>Select a Time</p>
                                    <p className="text-base text-center text-white/40 mt-3">If you dont see a specific time its reserved or barber doesnt work at that time</p>
                                    <p className="text-sm text-white/40 mt-3 h-3">{fullTime&&`Time: ${fullTime}`}</p>
                                </div> 
                                <TimePicker
                                    setFullTime={setFullTime}
                                    time={barberTime}
                                    continueM={continueToMinute}
                                    setContinueM={setContinueToMinute}
                                    setSelectedTime={setSelectedTime}
                                    
                                    setShowTime={setShowTime}/>
                                
                            </div>  

                        </div>
                    </div>}
                </>
                :
                ""
            }
        </>
        
    )
}