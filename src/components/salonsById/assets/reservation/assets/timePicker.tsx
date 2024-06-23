import { Button } from "@/components/ui/button";
import { SetStateAction, useEffect, useRef, useState } from "react";



export default function TimePicker({findDates,selectedTime,time,setFullTime,setSelectedTime,setShowTime,continueM,setContinueM}:{
    findDates:any[]
    time:string[];
    setShowTime:React.Dispatch<SetStateAction<boolean>>;
    setFullTime:React.Dispatch<SetStateAction<string>>;
    continueM:boolean;
    setContinueM:React.Dispatch<SetStateAction<boolean>>
    setSelectedTime:React.Dispatch<SetStateAction<string>>;
    selectedTime:string;
}) {
    const [minuteChoosed,setMinuteChoosed] = useState<number>(Number(selectedTime.split(":")[1]) || 0)
    const [hourChoosing,setHourChoosing] = useState<number|null>(Number(selectedTime.split(":")[0]) || 0)
    const hoursRef = useRef<HTMLDivElement>(null);
    const totalHours = (Number(time[1].split(":")[0])-Number(time[0].split(":")[0] ) + 24) %24 + 1; 
    const handleDone = () => {
        if(!hourChoosing) return
        if(!continueM && hourChoosing) return setContinueM(true)
        if(minuteChoosed == null) return
        setSelectedTime(`${hourChoosing}:${minuteChoosed < 10 ?`0${minuteChoosed}` : minuteChoosed}`)
        setFullTime(`${hourChoosing}:${minuteChoosed < 10 ?`0${minuteChoosed}` : minuteChoosed}`)
        setShowTime(false)
        setContinueM(false)
    }

    const findHoursReserved = findDates.find(dates => dates.time.split(':')[1] == "30" && dates.time.split(':')[0] == hourChoosing?.toString())

    const findHoursReserved2 = findDates.find(dates => dates.time.split(':')[1] == "00" && dates.time.split(':')[0] == hourChoosing?.toString())
    
    return (
        <>
            <div className="flex-1  w-full  rounded-lg pb-24">
                {!continueM
                ?
                <div className="custom-scrollbar border rounded-md"    
                ref={hoursRef}
                style={{
                    overflowY: 'scroll',
                    height:"400px",
                    WebkitOverflowScrolling: 'touch',
                }} 
                >
                    {Array.from(Array(totalHours).keys()).map((index) => {
                        let hour = (Number(time[0].split(":")[0]) + index) % 24;
                        const hourFullReserved = findDates.filter(dates => dates.time.split(":")[0] == hour.toString())
                        if(Number(time[1].split(':')[0]) == hour || Number(time[0].split(":")[0]) == hour && Number(time[0].split(":")[1]) >= 30) return
                        if(hourFullReserved.length == 2 && hourFullReserved[0].time.split(":")[0] == hour.toString()) return
                        return (
                            <div key={hour} className={`text-center p-4 border-y border-white/20 cursor-pointer ${hourChoosing == hour  ?"bg-white/30" :""}`} onClick={() => {
                                if(hourChoosing == hour) {
                                    setHourChoosing(0)
                                    setFullTime("")
                                }else {
                                    setHourChoosing(hour)
                                    setFullTime(`${hour}:`)
                                }
                                }}>
                                {hour < 10 ? `0${hour}` : hour}
                            </div>
                        );
                    })}
                </div>
                :
                <div className="flex-1 flex flex-col items-center justify-center gap-4 h-full" >
                    <div className="flex w-full border border-white/20 rounded-lg flex-col">
                        {!findHoursReserved2&&<div className={`border-y border-white/20 w-full p-4 text-center ${minuteChoosed == 0 ? "bg-white/30": ""} cursor-pointer rounded-t-lg`} onClick={() => {setMinuteChoosed(0)
                       setFullTime(prev => prev.split(":")[0]+`:00`)}}>
                            00
                        </div>}
                        {!findHoursReserved&&<div  className={`border-y border-white/20 w-full p-4 text-center rounded-b-lg ${minuteChoosed == 30 ? "bg-white/30": ""} cursor-pointer`} onClick={() => {setMinuteChoosed(30)
                        setFullTime(prev => prev.split(":")[0]+`:30`)}}>
                            30
                        </div>}
                        
                       

                    </div>
                </div>
                }
            </div>
            <div className="text-center fixed right-0 bottom-0  left-0 z-50 bg-black border-t border-white/10">
                <Button className="bg-green-1/80 hover:bg-green-1/60 transition-all duration-300 w-full rounded-none h-[50px]"
                disabled={!hourChoosing} 
                onClick={handleDone}>{continueM ?"Done" :"Continue"}</Button>
            </div>
            
        </>
    )
}