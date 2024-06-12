import { MdPreview,MdEdit  } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { SetStateAction, useEffect, useState } from "react";
import { motion,AnimatePresence } from "framer-motion";

const tabs = [
    {
        tab:"overview",
        text:"Overview",
        icon:<MdPreview className="text-xl"/>

    },
    {
        tab:"edit",
        text:"Edit",
        icon:<MdEdit className="text-xl"/>

    }
]

export default function SalonTabs({tab,setTab}:{
    tab:string;
    setTab:React.Dispatch<SetStateAction<string>>
}) {

    const [windowWidth,setWindowWidth] = useState<number>(window.innerWidth)
    const [show,setShow] = useState<boolean>(false)
    useEffect(() => {
        const handleSize = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener("resize",handleSize)

        return () => window.removeEventListener("resize",handleSize)
    },[])
    useEffect(() => {
        const handleClickOutside = (e:any) => {
            const overlay = document.querySelector(".tabs-select")
            if(overlay && !overlay.contains(e.target)) {
                setShow(false)
            }

        }
        document.addEventListener("click",handleClickOutside)
        return () => document.removeEventListener("click",handleClickOutside)
    },[])
   
    return (
        <>
            {windowWidth >1001
            ?
            <div className="border-r border-white/10 h-full px-2 group">
                <div className="flex justify-center items-center flex-col h-full gap-6">
                    {tabs.map((tabInfo,index) => {
                        return (
                            <div
                            key={index}
                            onClick={() => setTab(tabInfo.tab)} 
                            className={`flex gap-10 items-center text-lg cursor-pointer hover:bg-white/20 rounded-xl p-2 px-6 justify-between hover:opacity-80 transition-all duration-300 ${tab==tabInfo.tab?"bg-white/10":""} group w-fit group-hover:w-[210px]`}>
                                <div className="flex items-center gap-1 text-white/80 text-base">
                                    {tabInfo.icon}
                                    <p className="cursor-pointer group-hover:inline-block hidden">{tabInfo.text}</p>
                                    
        
                                </div>
                                <div
                                className={`  ${tab==tabInfo.tab ?"group-hover:animate-bounce repeat-1 group-hover:inline-block hidden" : "hidden"}`}
                                >
                                    <FaArrowRight className="text-xl text-end "/>
        
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            :
            <div className=" bg-black border-b border-b-white/10 p-5 w-full ">
                <div className="w-full flex justify-center items-center group " >
                    <div className="flex gap-1 flex-col hover:opacity-60 cursor-pointer tabs-select"  onClick={() => setShow(true)}>
                        <div className="h-1 w-[30px] bg-white rounded-full" />
                        <div className="h-1 w-[30px] bg-white rounded-full" />
                        <div className="h-1 w-[30px] bg-white rounded-full" />
                    </div>
                    <div className=" capitalize flex-1 text-center">
                        {tab}
                    </div>
                </div>
                <AnimatePresence>
                    {show&&<motion.div
                    initial={{
                        opacity:0
                    }} 
                    animate={{
                        opacity:show?1:0
                    }}
                    exit={{
                        opacity:0
                    }}
                    className="fixed bg-black/20 top-0 left-0 right-0 bottom-0 z-40">
                        <motion.div
                        initial={{
                            display:"none",
                            x:"-100%"
                        }} 
                        animate={{
                            display:show?"block":"none",
                            x:show?"-1%":"-100%"
                        }}
                        transition={{
                            duration:0.3,
                            ease:'linear'
                        }}
                        className="fixed no-doc-scroll left-0 top-0 bottom-0 w-[80%] sm:w-[40%] bg-black z-40 p-6 border-r border-r-white/10 md:pt-[6.5rem] tabs-select" >
                            
                            <div className="flex justify-center items-center">
                                <p className=" rounded-full p-1 w-fit px-3 border border-white/20 text-lg hover:bg-white hover:text-black transition-all duration-300 cursor-pointer" onClick={() => setShow(false)}>X</p>
                                <p className="flex-1 text-center text-lg">Tabs</p>
                            </div>
                            <div className="flex mt-10 items-center flex-col h-full gap-6">
                            {tabs.map((tabInfo,index) => {
                                return (
                                    <div
                                    key={index}
                                    onClick={() => setTab(tabInfo.tab)} 
                                    className={`flex gap-10 items-center text-lg cursor-pointer hover:bg-white/20 rounded-xl p-2 px-6 justify-between hover:opacity-80 transition-all duration-300 w-full ${tab==tabInfo.tab?"bg-white/10":""} group w-full`}>
                                        <div className="flex items-center gap-1 text-white/80 text-base">
                                            {tabInfo.icon}
                                            {tabInfo.text}
                
                                        </div>
                                        <motion.div
                                        initial={
                                            {
                                            display:tab==tabInfo.tab?"none":"inline",
                                            scale:tab==tabInfo.tab?1:0
                                        }
                                        }
                                        animate={
                                            {
                                            display:tab==tabInfo.tab?"inline":"none",
                                            scale:tab==tabInfo.tab?1:0
                                            }}
                                        transition={{duration:0.4,ease:"easeInOut"}}
                                        className={`  ${tab==tabInfo.tab ?"group-hover:animate-bounce repeat-1" : ""}`}
                                        >
                                            <FaArrowRight className="text-xl text-end"/>
                
                                        </motion.div>
                                    </div>
                                )
                            })}
                        </div>
                        </motion.div>
                    </motion.div>}
                </AnimatePresence>
            </div>}
        </>
    )
}