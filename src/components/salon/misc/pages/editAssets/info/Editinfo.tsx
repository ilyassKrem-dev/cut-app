import { motion } from "framer-motion";
import { SetStateAction, useState } from "react";
import { FaArrowDown } from "react-icons/fa6";
import InfoTab from "./infoTab";



export default function EditInfo({info,ids,setSalon}:{
    info:{
        salonName:string;
        phoneNumber:string;
    };
    ids:{
        userId:string;
        barberId:string
    };
    setSalon:React.Dispatch<SetStateAction<any>>
}) {
    const [show,setShow] = useState<boolean>(true)
    
    return (
        <div className="mt-4 md:mt-8 w-full  px-6 ">
            <div className={`border border-white/10 rounded-xl w-full flex flex-col   items-center  ${show?"h-[450px]":""}`}>
                <div className={`flex justify-center items-center w-full group hover:opacity-60 transition-all duration-300 cursor-pointer hover:bg-white/30 p-2   ${show?"border-b border-b-white/10   rounded-t-xl":"rounded-xl"}`} onClick={() => setShow(prev => !prev)}>
                    <p className="flex-1 text-center cursor-pointer">Info</p>
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
                {show&&<InfoTab
                info={info}
                ids={ids }
                setSalon={setSalon}/>}
            
            </div>
        </div>
    )
}