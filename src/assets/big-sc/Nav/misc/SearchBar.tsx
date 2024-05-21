import { useState } from "react"
import { IoSearchOutline } from "react-icons/io5"
import { motion } from "framer-motion"
import Location from "./search/location"
import { useSearchParams,useRouter } from "next/navigation"
import { RxCross2 } from "react-icons/rx";
import { FaMapMarked } from "react-icons/fa";
import ShowHomeMap from "@/components/home/misc/showHomeMap"
export default function SearchBar({scrolling}:{
    scrolling:boolean
}) {
    const searchParams = useSearchParams()
    
    const [enter,setEnter] = useState(false)
    const [city,setCity] = useState<string>(searchParams ?searchParams.get("city") as string :"")
    const [showLocation,setShowLocation] = useState<boolean>(false)
    const cityString = searchParams.get("city")
    const router = useRouter()
    const [showMap,setShowMap] = useState<boolean>(false)
    const handleClick = () => {
        
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        if(city.length == 0) {
            
            current.delete("city")
            return router.push(`/?${current.toString()}`)
        }
        if(searchParams.get("city")) {
            current.set('city',city)
            const search = current.toString();
            return router.push(`/?${search}`)
        }
        
        const search = current.toString();
        if(Array.from(current).length === 0) {
            
            return router.push(`/?city=${city}`)
        }
        router.push(`/?${search}&city=${city}`) 
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
           
            className={`absolute -top-12 text-white flex items-center justify-center w-full group`} onClick={() => setShowMap(true)}>
                <p className="text-lg font-bold cursor-pointer hover:opacity-65 transition-all duration-300 "><FaMapMarked className="text-2xl text-white/90"/></p>
                <div className="absolute text-xs bg-dark rounded-lg  -bottom-8 p-1 hidden group-hover:block text-gray-300 px-2">
                    <p>Map</p>
                </div>
            </motion.div>
            {showMap&&<ShowHomeMap setShowMap={setShowMap}/>}
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
                {city !== searchParams.get("city") || !city?
                <div className={`rounded-full bg-green-1 text-black cursor-pointer hover:opacity-50 transition-all duration-300 ${scrolling?"p-3":"p-4"}`} onClick={handleClick}>
                    <IoSearchOutline />
                </div>
                :
                <div className={`rounded-full bg-accent  text-white cursor-pointer hover:opacity-50 transition-all duration-300 ${scrolling?"p-3":"p-4"}`} onClick={handleRemove}>
                <RxCross2 />
            </div>}
            </div>
        </motion.div>
    )
}