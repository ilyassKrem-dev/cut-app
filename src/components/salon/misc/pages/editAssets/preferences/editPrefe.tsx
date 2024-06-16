import { motion } from "framer-motion"
import { SetStateAction, useState } from "react"
import { FaArrowDown } from "react-icons/fa6"
import PrefernceTab from "./preferTab"
interface Props {
    preferences:{
        prices:number[],
        dates:string[],
        time:string[],
        holiday:boolean
    } 
    ids:{
        userId:string;
        barberId:string;

    }
    setSalon:React.Dispatch<SetStateAction<any>>
}


export default function EditPrefereneces({
    preferences,ids,setSalon
}:Props) {

    const [show,setShow] = useState<boolean>(true)
    return (
        <div className="w-full  px-6 h-full">
            <div className={`border border-white/10 rounded-xl w-full flex flex-col   items-center  ${show?"h-full":""}`}>
                <div className={`flex justify-center items-center w-full group hover:opacity-60 transition-all duration-300 cursor-pointer hover:bg-white/30 p-2   ${show?"border-b border-b-white/10   rounded-t-xl":"rounded-xl"}`} onClick={() => setShow(prev => !prev)}>
                    <p className="flex-1 text-center cursor-pointer">Preferences</p>
                    <motion.div
                    initial={{
                        rotate:"0deg"
                    }}
                    animate={{
                        rotate:show?"0deg":"-90deg"
                    }}
                    transition={{
                        duration:0.2,
                        ease:"linear"
                    }}
                    >
                        <FaArrowDown className="self-end text-xl mb-[0.15rem] lg:hidden"/>

                    </motion.div>
                </div>
                <PrefernceTab 
                    preferences={preferences} 
                    ids={ids}
                    setSalon={setSalon}
                />
                    
            </div>
        </div>
    )
}