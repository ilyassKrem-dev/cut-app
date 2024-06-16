import { ChangeEvent, SetStateAction, useState } from "react";
import { Slider } from "@mui/material"
import { Checkbox } from "@/components/ui/checkbox";
import Box from '@mui/material/Box';
import TimeEdit from "./timeEdit";
import SavePref from "./savePref";
interface Props {
    preferences:Prefernces
    ids:{
        userId:string;
        barberId:string;

    }
    setSalon:React.Dispatch<SetStateAction<any>>
}
type Prefernces = {
    prices:number[],
    dates:string[],
    time:string[],
    holiday:boolean
}
const weekDays = ["Su","Mo","Tu","We","Th","Fr","Sa"]
export default function PrefernceTab({
    preferences,ids,setSalon
}:Props) {
    const [newPreferences,setNewPreferences] = useState<Prefernces>({
        prices:preferences.prices,
        dates:preferences.dates,
        time:preferences.time,
        holiday:preferences.holiday
    })
    const handlePriceChange=  (event: Event, newValue: number | number[]) =>  {
        setNewPreferences((prev:any) => {
            return {...prev,prices:newValue}
        })
    }
    const handleChangeDates = (e:ChangeEvent<HTMLInputElement>) => {
        
        if(newPreferences.dates.includes(e.target.value)) {
            setNewPreferences((prev:Prefernces) => {
                return {...prev,dates:newPreferences.dates.filter(date => date!==e.target.value)}
            })
        } else {
            setNewPreferences((prev:Prefernces) => {
                return {...prev,dates:[...prev.dates,e.target.value]}
            })
        }
        setNewPreferences((prev:Prefernces) => {
            return {...prev,dates:[...prev.dates].sort((a,b) => weekDays.indexOf(a) - weekDays.indexOf(b))}
        })
    }

    const handleHoliday = (value: boolean) => {
        setNewPreferences(prev => {
            return {...prev,holiday:value}
        })
    }
    const setAllDays = (value:boolean) => {
        if(value) {
            setNewPreferences((prev:Prefernces) => {
                return {...prev,dates:weekDays}
            })

        } else {
            setNewPreferences((prev:Prefernces) => {
                return {...prev,dates:[]}
            })
        }
    }
    const allSame = (weekDays.length == newPreferences.dates.length) && newPreferences.dates.every((value, index) => value === weekDays[index])


    const checkSame = newPreferences.dates === preferences.dates && newPreferences.holiday === newPreferences.holiday && newPreferences.prices === newPreferences.prices && newPreferences.time === preferences.time || newPreferences.dates.length ==0

    return (
        <div className="flex-col flex gap-5 w-full p-6 px-10 2xl:w-[582px]">
            <div className=" space-y-3 md:space-y-0  rounded-lg ">
                <div className="flex items-center gap-10 w-full md:gap-5 flex-col">
                    <div className="flex gap-1  mb-2 flex-col self-start">
                        <p className="">Prices</p>
                        <p className="text-xs text-white/40">Change prices</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2 items-center text-xs justify-between">
                            <div className=" rounded-xl text-white flex gap-1">
                                Min:
                                <span>{newPreferences.prices[0]}Dh</span>
                            </div>
                            <div className=" rounded-xl text-white flex gap-1">
                                Max:
                                <span>{newPreferences.prices[1]}Dh</span>
                            </div>
                        </div>
                        <div>
                            <Box sx={{ width: 300 }}>
                                    <Slider
                                    getAriaLabel={() => 'Price'}
                                    value={newPreferences.prices}
                                    onChange={handlePriceChange}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={valuetext}
                                    max={500}
                                    min={10}
                                    sx={{
                                        color:"gray"
                                    }}
                                />
                            </Box>

                        </div>

                    </div>
                </div>
                
            </div>
            <TimeEdit 
                time={newPreferences.time}
                setNewPreferences={setNewPreferences}
            />
            <div className="">
                <div className="flex items-center gap-5 w-full md:gap-5 flex-col">
                    <div className="flex gap-1  mb-2 flex-col self-start">
                        <p className="">Dates</p>
                        <p className="text-xs text-white/40">Change Date of work</p>
                    </div>
                    <div className="flex flex-col gap-3 items-center">
                        
                        <div className="md:border border-white/30   rounded-xl flex flex-wrap md:flex-auto justify-center md:justify-start">
                            {weekDays.map((day,index) => {
                                return (
                                    <label htmlFor={day+index} key={day+"-"+index} className={` max-[400px]:text-xs
                                    text-sm  hover:bg-white/50 hover:text-black p-2 cursor-pointer transition-all duration-300  ${index ===0 ?"min-[374px]:rounded-l-xl" :index===weekDays.length-1 ? "min-[374px]:rounded-r-xl":"" } ${newPreferences.dates.includes(day) ? "bg-white text-black":""} border border-white/30 md:border-0`}>
                                        <label htmlFor={day+index} className=" cursor-pointer">
                                            {day}
                                        </label>
                                        <input type="checkbox" name="date" 
                                        value={day}
                                        checked={newPreferences.dates.includes(day)}
                                        onChange={handleChangeDates}
                                        id={day+index} className=" appearance-none "/>

                                    </label>

                                )
                            })}

                        </div>
                        <div className="flex gap-4">
                            <div className="flex gap-2 items-center text-xs justify-center">
                                All days
                                <Checkbox 
                                checked={allSame}
                                onCheckedChange={setAllDays}/>
                            </div>
                            <div className="flex gap-2 items-center text-xs justify-center">
                                Holidays
                                <Checkbox 
                                checked={newPreferences.holiday}
                                onCheckedChange={handleHoliday}/>
                            </div>

                        </div>
                    </div>
                </div>
                
            </div>
            <SavePref 
                ids={ids}
                newPreferences={newPreferences}
                check={checkSame}
                setSalon={setSalon}
            />
        </div>
    )
}

function valuetext(value: number) {
    return `${value}`;
}