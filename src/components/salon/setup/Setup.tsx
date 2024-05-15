
import { useState } from "react"
import MultiStepProgressBar from "../other/progressBar"
import Preferences from "./tabs/preferences"
import InfoS from "./tabs/infoS"
import { checkPrefernces,checkInfo, checkLocation } from "../other/checkInfo"
import LocationS from "./tabs/locationS"
export default function Setup({userId}:{
    userId:string
}) {  
    const [nowStep,setNowStep] = useState<number>(4)
    const [prefernces,setPrefences] = useState({
        value:[20,300],
        time:{open:"",close:""},
        dates:{
            week:[] as string[],
            holidays:false,
        }
    })
    const [info,setInfo] = useState({
        name:"",number:"",images:[] as File[]
    })
    const [images,setImages] = useState<string[]>([])
    const [locationInfo,setLocationInfo] = useState({
        city:"",address:"",mapLocation:{
            longitude:-7.5898,
            latitude:33.5731
        }
    })
    const [mapChanged, setMapChanged] = useState<boolean>(false);
    
    const handleClickStep = (number:number) => {
        const isNextInfo = checkPrefernces(prefernces)
        const isNextLocation = checkInfo(info)
        const toComplete = checkLocation(locationInfo,mapChanged)
        if(number === 1) {
            return setNowStep(number)
        }
        
        if(number === 2) {
            if(!isNextInfo) return
            return setNowStep(number)
        }
        if(number ===3 ) {
            if(!isNextLocation || !isNextInfo) return
            return setNowStep(3)
        }
        if(number ===4 ) {
            if(!isNextLocation || !isNextInfo || !toComplete) return
            return setNowStep(4)
        }
        
        
    }
    
    return (
        <div className="pt-[5rem] md:pt-[11rem] pb-36 md:pb-0">
            <div className="fixed top-0 left-0  right-0  bg-black border-b border-b-white/10 md:top-[5.532rem] z-50  ">
                <div className="flex pt-2 px-16 items-center pb-7 md:px-36 ">
                    <MultiStepProgressBar 
                    nowStep={nowStep}
                    setNowStep={setNowStep}
                    handleClickStep={handleClickStep}
                      />
                </div>
                
            </div>
            <div>
                {nowStep===1?
                <Preferences 
                setPrefences={setPrefences} 
                prefernces={prefernces}
                setNowStep={setNowStep}/>
                :
                nowStep == 2 ?
                <InfoS 
                setInfo={setInfo} 
                info={info}
                setNowStep={setNowStep}
                images={images}
                setImages={setImages}
                />
                :
                nowStep == 3 ?
                <LocationS 
                setLocationInfo={setLocationInfo} 
                locationInfo={locationInfo}
                setNowStep={setNowStep}
                setMapChanged={setMapChanged}
                mapChanged={mapChanged}
                 />
                :
                ""}
            </div>
        </div>
    )
}