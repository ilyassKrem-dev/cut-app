
import { motion } from "framer-motion"
import { SetStateAction, useState } from "react"

import { Button } from "@/components/ui/button"
import PriceFilter from "./filters/price"
import StarsFilter from "./filters/stars"
import { useRouter } from "next/navigation"
export default function Filters({setShow,setNumFilters}:{
    setShow:React.Dispatch<SetStateAction<boolean>>
    setNumFilters:React.Dispatch<SetStateAction<number>>
}) {
    const [rating ,setRating] = useState<number | null>(0)
    const [hover, setHover] = useState<number>(-1);
    const [version,setVersion] = useState<string>("")
    
    const [priceFilter,setPriceFilter] = useState({
        min:"0",max:"200"
    })
    const router = useRouter()
    const handleSave = () => {
        let num = 0
        if(rating!==0) {
            num++
        }
        if(version) {
            num++
        }
        if(parseFloat(priceFilter.min) !== 0) {
            num++
        }
        if(parseFloat(priceFilter.max) !== 0) {
            num++
        }
        
        setNumFilters(num)
        
        router.push(`/?rating=${rating !== 0 ? rating : "null"}&equ=${version?version : 'null'}&min=${priceFilter.min ? parseFloat(priceFilter.min):"null"}&max=${priceFilter.max ? parseFloat(priceFilter.max):"null"}`)
        setShow(false)
    }
    const handleReset = () => {
        setPriceFilter({
            min:'0',max:'200'
        })
        setRating(0)
        setHover(-1)
        setVersion("")
        setNumFilters(0)
        router.push('/')
    }
    return(
        <motion.div
        initial={{y:"100%"}}
        animate={{y:"0"}} 
        transition={{duration:0.5,ease:"easeInOut"}}
        className="fixed bottom-0 right-0 left-0 bg-light h-[98.5%] rounded-t-3xl z-50 text-dark md:top-0 md:h-full md:flex md:flex-col md:justify-center md:items-center md:bg-transparent">
                <div className="flex flex-col  md:bg-light md:w-[60%] md:h-[80%] md:rounded-xl gap-5">
                    <div className="border-b border-dark/30 shadow-md  w-full text-center p-3 flex justify-center items-center">
                        <p className="self- text-2xl font-semibold text-gray-500 hover:bg-gray-300/40 rounded-full px-2 cursor-pointer transition-all duration- hover:opacity-60 active:opacity-50 active:bg-gray-300/80" onClick={() => setShow(false)}>x</p>
                        <h2 className="flex-1 font-bold  mr-14">Filters</h2>
                        
                    </div>
                    <div className="flex flex-col flex-1 overflow-auto">
                        <PriceFilter priceFilter={priceFilter} setPriceFilter={setPriceFilter}/>
                        <StarsFilter 
                        rating={rating} 
                        hover={hover} 
                        version={version} 
                        setRating={setRating}
                        setHover={setHover}
                        setVersion={setVersion}/>
                    </div>
                    <div className="border-t border-dark/30   w-full text-center p-3 flex justify-between items-center fixed bottom-0 left-0 right-0 z-50 bg-lighter px-4 md:static rounded-b-xl">
                        <p className="font-semibold cursor-pointer hover:opacity-60 transition-all duration-300 active:opacity-40" onClick={handleReset}>Remove all</p>
                        <Button className="flex-1 max-w-[200px] hover:opacity-60 transition-all duration-300 active:opacity-40" onClick={handleSave}>Filter</Button>  
                    </div>
                </div>
                
        </motion.div>

    )
}