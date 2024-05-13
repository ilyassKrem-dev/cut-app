
import { SetStateAction } from "react";

import PricePre from "./preferences-items/pricePre";
import TimePre from "./preferences-items/timePre";
import DatesPre from "./preferences-items/datesPre";
import { Button } from "@/components/ui/button";
import { checkPrefernces } from "../../other/checkInfo";
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
    prefernces:Preferences;
    setPrefences:React.Dispatch<SetStateAction<Preferences>>;
    setNowStep:React.Dispatch<SetStateAction<number>>
}

export default function Preferences({prefernces,setPrefences,setNowStep}:Props) {
    const isNext = checkPrefernces(prefernces)
    const handleNext = () => {
        if(!isNext) return
        setNowStep(2)
    }
    return (
        <div className="flex items-center flex-col gap-5">
            <div className="flex items-center justify-center flex-col gap-2  py-6 text-light w-full">
                <h1 className="text-xl font-semibold">Prefercences</h1>
                <p className="text-sm">Let's get your salon started</p>
            </div>
            <div className="w-full px-4 flex flex-col gap-10 items-center">
                <div className="w-full md:border rounded-lg flex flex-col gap-8 md:p-6 border-white/20 md:gap-12">
                    <PricePre value={prefernces.value} setPrefences={setPrefences}/>
                    <TimePre time={prefernces.time} setPrefences={setPrefences}/>
                    <DatesPre 
                    dates={prefernces.dates}
                    setPrefences={setPrefences}
                    />
                </div>
                <Button
                onClick={handleNext}
                className="w-full md:max-w-[500px] bg-green-1/80 hover:bg-green-1/20 transition-all duration-300" disabled={!isNext}>Next</Button>
            </div>
        </div>
    )
}