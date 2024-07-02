import { useState } from "react"
import { IoSearchOutline } from "react-icons/io5"
import { motion } from "framer-motion"
import Location from "./search/location"
import { useSearchParams,useRouter } from "next/navigation"
import { RxCross2 } from "react-icons/rx";
import { FaMapMarked } from "react-icons/fa";
import ShowHomeMap from "@/components/home/misc/showHomeMap"
import { Suspense } from "react"
import Price from "./search/price"
export default function SearchBar({scrolling}:{
    scrolling:boolean
}) {
    const searchParams = useSearchParams()
    
    const [enter,setEnter] = useState(false)
    const [price,setPrice] = useState<string>(searchParams ?searchParams.get("min") as string :"0")
    const [city,setCity] = useState<string>(searchParams ?searchParams.get("city") as string :"")
    const [showLocation,setShowLocation] = useState<boolean>(false)
    const [showPrice,setShowPrice] = useState<boolean>(false)
    const cityString = searchParams.get("city")
    const priceString = searchParams.get("min")
    const router = useRouter()
    const [showMap,setShowMap] = useState<boolean>(false)
    const handleClick = () => {
        
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        if(priceString && !price) {
            current.delete("min")
            return router.push(`/?${current.toString()}`)
        }
        if(cityString &&!city) {
            current.delete("city")
            return router.push(`/?${current.toString()}`)
        }
        if(searchParams.get("city") !== city) {
            current.set('city',city)
            const search = current.toString();
            return router.push(`/?${search}`)
        }
        if(searchParams.get("min") !== price) {
            current.set('min',price)
            const search = current.toString();
            return router.push(`/?${search}`)
        }
        const search = current.toString();
        if(Array.from(current).length === 0 && city && !price) {
            return router.push(`/?city=${city}`)
        }
        if(Array.from(current).length === 0 && !city && price) {
            return router.push(`/?min=${price}`)
        }
        if(priceString && city)  {
            return  router.push(`/?${search}&city=${city}`)
        }
        if(cityString && price)  {
            return  router.push(`/?${search}&min=${price}`)
        }
        router.push(`/?${search}${city && city.length > 0? `city=${city}`: ""}${price && price.length > 0? `&min=${price}`: ""}`)
    }
    
    const handleRemove = () => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        current.delete('city')
        current.delete('min')
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
            {showMap&&
            <Suspense>
                <ShowHomeMap setShowMap={setShowMap}/>
            </Suspense>
            }
            <Location
            scrolling={scrolling}
            enter={enter} 
            setEnter={setEnter}
            setCity={setCity}
            city={city}
            cityString={cityString}
            showLocation={showLocation}
            setShowLocation={setShowLocation}/>
            <Price 
             scrolling={scrolling}
             enter={enter} 
             setEnter={setEnter}
             setPrice={setPrice}
             price={price}
             priceString={priceString}
             showPrice={showPrice}
             setShowPrice={setShowPrice}/>
            
           
            <div className="text-xl pr-1 pl-2">
                {city !== cityString ||  price !== priceString  ?
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