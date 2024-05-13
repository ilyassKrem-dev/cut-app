import { Checkbox } from "@/components/ui/checkbox";
import { ChangeEvent, SetStateAction } from "react";


interface Preferences {
    value:number[];
    time:{
        open:string;
        close:string;
    },
    dates:{
        week:string[];
        holidays:boolean
    }
}

interface Props {
    dates:{
        week:string[];
        holidays:boolean;
    }
    setPrefences:React.Dispatch<SetStateAction<Preferences>>
}

const weekDays = ["Su","Mo","Tu","We","Th","Fr","Sa"]
export  default function DatesPre({dates,setPrefences}:Props) {
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {checked,value} = e.target
        
        setPrefences((prev:any) => {
            let updateWeek = prev.dates.week
            if(checked) {
                updateWeek = [...updateWeek,value]
            }else {
                updateWeek= updateWeek.filter((day:string) => day !==value)
            }
            return {...prev,dates:{...prev.dates,week:updateWeek}}
        })
    }
    const handleToogle = (value:boolean) => {
   
        setPrefences((prev:Preferences) => {
            return {...prev,dates:{...prev.dates,holidays:value}}
        })
    }
    const setAll = (value:boolean) => {
        if(value) {
            setPrefences((prev:Preferences) => {
                return {...prev,dates:{
                    ...prev.dates,week:weekDays
                }}
            })

        } else {
            setPrefences((prev:Preferences) => {
                return {...prev,dates:{
                    ...prev.dates,week:[]
                }}
            })
        }
    }
    return (
        <div className="md:flex items-center justify-between space-y-3 md:space-y-0 border border-white/20 md:border-0 p-6 md:p-0 rounded-lg md:rounded-none">
            <div className="flex items-center gap-5 w-full md:gap-5">
                <div className="flex gap-1  mb-2">
                    <p className="">Dates</p>
                    <span className='text-xs text-accent'>*</span>
                </div>
                <div className="flex flex-col gap-3">
                    
                    <div className="md:border border-white/30   rounded-xl flex flex-wrap md:flex-auto justify-center md:justify-start">
                        {weekDays.map((day,index) => {
                            return (
                                <div key={day+"-"+index} className={` max-[400px]:text-xs
                                text-sm  hover:bg-white/50 hover:text-black p-2 cursor-pointer transition-all duration-300  ${index ===0 ?"min-[400px]:rounded-l-xl" :index===weekDays.length-1 ? "min-[400px]:rounded-r-xl":"" } ${dates.week.includes(day) ? "bg-white text-black":""} border border-white/30 md:border-0`}>
                                    <label htmlFor={day+index} className=" cursor-pointer">
                                        {day}
                                    </label>
                                    <input type="checkbox" name="date" 
                                    value={day}
                                    checked={dates.week.includes(day)}
                                    onChange={handleChange}
                                    id={day+index} className=" appearance-none "/>

                                </div>

                            )
                        })}

                    </div>
                    <div className="flex gap-4">
                        <div className="flex gap-2 items-center text-xs justify-center">
                            All days
                            <Checkbox 
                            checked={dates.week == weekDays}
                            onCheckedChange={setAll}/>
                        </div>
                        <div className="flex gap-2 items-center text-xs justify-center">
                            Holidays
                            <Checkbox 
                            checked={dates.holidays}
                            onCheckedChange={handleToogle}/>
                        </div>

                    </div>
                </div>
            </div>
            <div className="text-sm md:w-[455px] text-white/80 max-w-[400px] leading-6">
                <p>Set up work days where you open your salon</p>
                
            </div>
        </div>
    )
}