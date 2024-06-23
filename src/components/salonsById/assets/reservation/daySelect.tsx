
import { SetStateAction, useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { format, addDays } from 'date-fns';
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function DaySelect({setSelectedDay,selectedDay,barberDays}:{
    setSelectedDay:React.Dispatch<SetStateAction<string>>;
    selectedDay:string;
    barberDays:string[]
}) {
    const [windowSize,setWindowSize] = useState<number>(window.innerWidth)
    const [showDate,setShowDate] = useState<boolean>(false)
    const [dateSe,setDateSe] = useState<string|null>(null)
    const handleBack = () => {
        setShowDate(false)
        if(selectedDay) return
        setSelectedDay("")
        setDateSe(null)
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
            const overlay = document.querySelector(".day-tab");
            if(overlay && !overlay.contains(e.target as any)) {
                handleBack()
            }
        }
        document.body.addEventListener('click',handleOutsideClick)

        return () => document.body.removeEventListener("click",handleOutsideClick)
    },[])
    const handleDone = () => {
        if(!dateSe) return
        setShowDate(false)
        setSelectedDay(dateSe as string)
    }
    const handleClick = (day:string) => {
        if(dateSe == day) {
           return  setDateSe("")
        }
        setDateSe(day)
    }
    

    const today = new Date();
    const startDayIndex = today.getDay(); 
    const daysNew:string[] = [];
    for (let i = 0; i < 7; i++) {
        const currentDay = addDays(today, i);
        const dayName = daysOfWeek[(startDayIndex + i) % 7];
        const date = format(currentDay, 'MMMM d');
        const fullDate = `${dayName} / ${date}`;
        daysNew.push(fullDate);
    }
    const daysOfbarber = daysNew.filter((day) => barberDays.includes(day.substring(0,2)))
    const handleChangeDay = (value:string) => {
        setSelectedDay(value)
    }
    return (
        <>
            {windowSize <767 
            ?
            <>
                <div className="relative border-white/20 border rounded-lg flex justify-between p-4 items-center cursor-pointer hover:bg-white/30 hover:opacity-80 transition-all duration-300" onClick={() =>setShowDate(true)}>
                    <div className="flex justify-center items-center " >
                        Day
                    </div>
                    {!selectedDay?<div className="flex gap-1 items-center">
                        <p className="text-white/70">Choose a day</p>
                        <MdArrowForwardIos className="text-white/70"/>
                    </div>
                    :
                    <div className="flex gap-1 items-center">
                        <p className="text-white/70">{selectedDay}</p>
                    </div>}
                    

                </div>
                {showDate&&<div className="fixed top-0 left-0 right-0 bottom-0 bg-black/60 z-50 flex flex-col justify-end no-doc-scroll md:justify-center md:items-center">
                    <div className="bg-black rounded-t-2xl border-t border-t-white/10 h-[80%] flex flex-col reserve-tab md:w-full md:max-w-[800px] md:h-fit md:rounded-2xl md:border-white/10 day-tab overflow-y-scroll custom-scrollbar">
                        <div className="flex justify-center p-4 border-b border-white/10 items-center">
                            <div className=" flex-1" onClick={handleBack}>
                                <div className=" font-semibold border rounded-full px-[0.7rem] py-[0.7rem]  cursor-pointer hover:opacity-60 hover:bg-white hover:text-black transition-all duration-300 active:opacity-40 border-white/10 w-fit" onClick={() => setShowDate(false)}>
                                    <FaArrowLeft className="text-sm"/>
                                </div>
                                
                            </div>
                            <div className="flex-1 text-center text-lg ">
                                Day
                            </div>
                            <div className="flex-1" />

                    
                        </div>
                        <div className="flex gap-10 flex-col p-4 mt-6 h-full">
                            <div className="text-center">
                                <p>Select a day</p>
                            </div>    
                            <div className="flex justify-center items-center flex-col  border-white/10 rounded-lg border  h-fit text-center">
                                {daysOfbarber.map((day,index) => {
                                    
                                    return (
                                        <div key={index} className={`border-y border-y-white/10 w-full p-4 ${index == 0 ? "border-t-0 rounded-t-lg":index == daysOfWeek.length-1 ?"border-b-0 rounded-b-lg" : ""} hover:opacity-60 hover:bg-opacity-60 transition-all duration-300 hover:bg-white/30 cursor-pointer ${dateSe == day ? "bg-white/30" : ""}`} onClick={() => {handleClick(day)}}>
                                            {day}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="text-center">
                                <Button className="bg-green-1/80 hover:bg-green-1/60 transition-all duration-300 w-full"
                                disabled={!dateSe} 
                                onClick={handleDone}>Done</Button>
                            </div>
                        </div>
                    </div>
                </div>}
            </>
            :
            <div className="flex-1">
                <Select value={selectedDay} onValueChange={handleChangeDay}>
                        <SelectTrigger className="w-full  bg-black">
                            <SelectValue placeholder="Day" />
                        </SelectTrigger>
                        <SelectContent className="bg-black text-white">
                            {daysOfbarber.map((day,index) => {
                                return (
                                    <SelectItem className="cursor-pointer" key={index} value={day}>{day}</SelectItem>
                                )
                            })}
                           
                        </SelectContent >
                    </Select>

            </div>}
        </>
    )
}