
import { SetStateAction } from "react";

import NameS from "./info/nameS";
import { Button } from "@/components/ui/button";
import PhoneS from "./info/phoneS";
import ImagesS from "./info/imagesS";
import { checkInfo } from "../../other/checkInfo";
interface Info {
    name:string;
    number:string,
    images:File[]
}
interface Props {
    info:Info;
    setInfo:React.Dispatch<SetStateAction<Info>>;
    setNowStep:React.Dispatch<SetStateAction<number>>;
    images:string[];
    setImages:React.Dispatch<SetStateAction<string[]>>
}

export default function InfoS({info,setInfo,setNowStep,images,setImages}:Props) {
    const toNext = checkInfo(info)
    const handleNext = () => {
        if(!toNext) return
        setNowStep(3)
    }
    return (
        <div className="flex items-center flex-col gap-5 pb-12">
            <div className="flex items-center justify-center flex-col gap-2  py-6 text-light w-full">
                <h1 className="text-xl font-semibold">Info</h1>
                <p className="text-sm">Set up your salon info</p>
            </div>
            <div className="w-full px-4 flex flex-col gap-10 items-center">
                <div className="w-full md:border rounded-lg flex flex-col gap-8 md:p-6 border-white/20 md:gap-12">
                    <NameS 
                    name={info.name} 
                    setInfo={setInfo}/>
                    <PhoneS 
                    number={info.number} 
                    setInfo={setInfo}/>
                    <ImagesS  
                     setInfo={setInfo}
                     images={images}
                    setImages={setImages}
                    />

                    
                </div>
                <Button
                onClick={handleNext}
                className="w-full md:max-w-[500px] bg-green-1/80 hover:bg-green-1/20 transition-all duration-300" disabled={!toNext}>Next</Button>
            </div>
        </div>
    )
}