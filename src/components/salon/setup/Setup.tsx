
import { useState } from "react"
import MultiStepProgressBar from "../other/progressBar"

export default function Setup({userId}:{
    userId:string
}) {  
    const [nowStep,setNowStep] = useState<number>(1)
    
    return (
        <div>
            <div className="fixed top-0 left-0  right-0 z-50 bg-black border-b border-b-white/10 md:top-[6rem] ">
                <div className="flex pt-2 px-16 items-center pb-7 md:px-36">
                    <MultiStepProgressBar 
                    nowStep={nowStep}
                    setNowStep={setNowStep}
                      />
                </div>
            </div>
        </div>
    )
}