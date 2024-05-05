import { useState } from "react"
import { IoSearchOutline } from "react-icons/io5"
import { motion } from "framer-motion"
import Location from "./search/location"
import { useSearchParams,useRouter } from "next/navigation"
import { RxCross2 } from "react-icons/rx";

export default function SearchBar({scrolling}:{
    scrolling:boolean
}) {
    
    const [enter,setEnter] = useState(false)
    const [city,setCity] = useState<string>("")
    const [showLocation,setShowLocation] = useState<boolean>(false)
    const searchParams = useSearchParams()
    const cityString = searchParams.get("city")
    const router = useRouter()
    
    const handleClick = () => {
        if(!city) return
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        
        if(searchParams.get("city")) {
            current.set('city',city.toLowerCase())
            const search = current.toString();
            return router.push(`/?${search}`)
        }
        
        const search = current.toString();
        if(Array.from(current).length === 0) {
            
            return router.push(`/?city=${city.toLowerCase()}`)
        }
        router.push(`/?${search}&city=${city.toLowerCase()}`) 
    }
    const handleRemove = () => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        current.delete('city')
        router.push(`/?${current.toString()}`)
    }
    return (
        <motion.div
        initial={{position:"relative",bottom:"-4rem",width:'70%'}} 
        animate={{
            bottom:scrolling?"0rem":"-4rem",height:scrolling?"3.5rem":"64px",
            width:scrolling?"50%":"70%"}}
        
        className={` ${showLocation?"bg-dark":'bg-black'} rounded-full text-white flex items-center border-dark shadow-[0px_0px_6px_2px_rgba(255,255,255,0.4)] max-w-[800px] `}>
            <motion.div
            initial={{top:"-3.2rem"}} 
            animate={{top:scrolling?"-6rem":"-3.2rem"}}
           
            className={`absolute -top-12 text-white flex items-center justify-center w-full`}>
                <p className="text-lg font-bold cursor-pointer hover:opacity-65 transition-all duration-300 text-gray-400">Map</p>
                
            </motion.div>
            <Location
            scrolling={scrolling}
            enter={enter} 
            setEnter={setEnter}
            setCity={setCity}
            city={city}
            cityString={cityString}
            showLocation={showLocation}
            setShowLocation={setShowLocation}/>
            <div className="flex flex-col gap-1 pl-6  py-3 cursor-pointer hover:opacity-60 transition-all duration-300 hover:bg-gray-400/50 rounded-full flex-1 h-full justify-center" 
            onMouseEnter={() => setEnter(true)}
            onMouseLeave={() => setEnter(false)}>
                <h4 className=" text-sm cursor-pointer">Price</h4>
                {!scrolling&&<p className="text-gray-400 text-xs cursor-pointer">Min price</p>}
            </div>
            <div className="text-xl pr-1 pl-2">
                {!cityString?
                <div className="rounded-full bg-green-1 p-3 text-black cursor-pointer hover:opacity-50 transition-all duration-300" onClick={handleClick}>
                    <IoSearchOutline />
                </div>
                :
                <div className="rounded-full bg-accent p-3 text-white cursor-pointer hover:opacity-50 transition-all duration-300" onClick={handleRemove}>
                <RxCross2 />
            </div>}
            </div>
        </motion.div>
    )
}