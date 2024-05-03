import { useState } from "react"
import { IoSearchOutline } from "react-icons/io5"
import { motion } from "framer-motion"
import Location from "./search/location"

export default function SearchBar({scrolling}:{
    scrolling:boolean
}) {
    
    const [enter,setEnter] = useState(false)
    
    return (
        <motion.div
        initial={{position:"relative",bottom:"-4rem",width:'70%'}} 
        animate={{
            bottom:scrolling?"0rem":"-4rem",height:scrolling?"3.5rem":"64px",
            width:scrolling?"50%":"70%"}}
        
        className={` bg-white rounded-full shadow-sm text-black flex items-center `}>
            <motion.div
            initial={{top:"-3.2rem"}} 
            animate={{top:scrolling?"-6rem":"-3.2rem"}}
           
            className={`absolute -top-12 text-white flex items-center justify-center w-full`}>
                <p className="text-lg font-bold cursor-pointer hover:opacity-65 transition-all duration-300">Map</p>
                
            </motion.div>
            <Location
            scrolling={scrolling}
            enter={enter} 
            setEnter={setEnter}/>
            <div className="flex flex-col gap-1 pl-6  py-3 cursor-pointer hover:opacity-60 transition-all duration-300 hover:bg-gray-400/50 rounded-full flex-1 h-full justify-center" 
            onMouseEnter={() => setEnter(true)}
            onMouseLeave={() => setEnter(false)}>
                <h4 className="font-bold text-sm cursor-pointer">Price</h4>
                {!scrolling&&<p className="text-gray-400 text-xs cursor-pointer">Min price</p>}
            </div>
            <div className="text-xl pr-1 pl-2">
                <div className="rounded-full bg-blue-300 p-3 text-white cursor-pointer hover:opacity-50 transition-all duration-300 lg:p-4">
                    <IoSearchOutline />
                </div>
            </div>
        </motion.div>
    )
}