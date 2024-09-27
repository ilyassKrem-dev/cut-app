
"use client"
import { AiOutlineMessage } from "react-icons/ai";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
export default function MessagesHome() {
    const [windowSize,setWindowSize] = useState<number>(0)

    useEffect(() => {
        if(windowSize == 0) return setWindowSize(window.innerWidth)
        const changeWidth = () => {
            setWindowSize(window.innerWidth)
        }
        window.addEventListener("resize",changeWidth)
        
        return () => window.removeEventListener("resize",changeWidth)
    },[windowSize])
    return (
        <>
            {windowSize > 767 &&<div className=" justify-center items-center w-full flex-col gap-2 flex" >
                <motion.div
                initial={{opacity:"0",y:"-50%"}}
                animate={{opacity:1,y:0}}
                transition={{duration:0.2,ease:'linear'}}
                >
                    <AiOutlineMessage className="text-7xl"/>
                    
                </motion.div>
                <motion.p
                    initial={{opacity:"0",y:"50%"}}
                    animate={{opacity:1,y:0}}
                    transition={{duration:0.2,ease:'linear'}}
                    >Start chatiing</motion.p>
            </div>
            }
            
        </>
    )
}