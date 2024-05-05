
import { motion } from "framer-motion"
import { SetStateAction, useState } from "react"

import { Button } from "@/components/ui/button"
import PriceFilter from "./filters/price"
import StarsFilter from "./filters/stars"
import { useRouter,useSearchParams } from "next/navigation"
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
    const searchParams = useSearchParams()
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
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        if(searchParams.get('rating')) {
            current.set('rating',`${rating?rating : "null"}`)
            const search = current.toString()
            router.push(`/?${search}`)
        }
        if(searchParams.get("equ")) {
            current.set('equ',`${version?version : 'null'}`)
            const search = current.toString()
            router.push(`/?${search}`)
        }
        if(searchParams.get("min")) {
            current.set('min',`${priceFilter.min ? parseFloat(priceFilter.min):"null"}`)
            const search = current.toString()
            router.push(`/?${search}`)
        }
        if(searchParams.get("max")) {
            current.set('max',`${priceFilter.max ? parseFloat(priceFilter.max):"null"}`)
            const search = current.toString()
            router.push(`/?${search}`)
        }
        setShow(false)
        const search = current.toString()
        if(searchParams.get("rating") && searchParams.get("equ") && searchParams.get("min") && searchParams.get("max")) return

        router.push(`/?${search}&rating=${rating !== 0 ? rating : "null"}&equ=${version?version : 'null'}&min=${priceFilter.min ? parseFloat(priceFilter.min):"null"}&max=${priceFilter.max ? parseFloat(priceFilter.max):"null"}`)
        
    }
    const handleReset = () => {
        setPriceFilter({
            min:'0',max:'200'
        })
        setRating(0)
        setHover(-1)
        setVersion("")
        setNumFilters(0)
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        current.delete("min")
        current.delete("max")
        current.delete("equ")
        current.delete('rating')
        const search = current.toString()
        router.push(`/?${search}`)
    }
    return(
        <motion.div
        initial={{y:"100%"}}
        animate={{y:"0"}} 
        transition={{duration:0.5,ease:"easeInOut"}}
        className="fixed bottom-0 right-0 left-0 bg-[rgb(23,23,23)] h-[98.5%] rounded-t-3xl z-50 text-light md:top-0 md:h-full md:flex md:flex-col md:justify-center md:items-center md:bg-transparent shadow-[0px_0px_6px_2px_rgba(255,255,255,0.2)]">
                <div className="flex flex-col  md:bg-[rgb(20,20,23)] md:w-[60%] md:h-[80%] md:rounded-xl gap-5 md:shadow-[0px_0px_4px_1px_rgba(255,255,255,0.2)]">
                    <div className=" w-full text-center p-3 flex justify-center border-b border-white/20 items-center bg-black rounded-t-3xl md:rounded-xl">
                        <p className="self- text-xl font-semibold text-light hover:bg-gray-300/40 rounded-full px-2 cursor-pointer transition-all duration- hover:opacity-60 active:opacity-50 active:bg-gray-300/80" onClick={() => setShow(false)}>x</p>
                        <h2 className="flex-1 font-bold  mr-14">Filters</h2>
                        
                    </div>
                    <div className="flex flex-col flex-1 overflow-auto gap-6">
                        <PriceFilter priceFilter={priceFilter} setPriceFilter={setPriceFilter}/>
                        <StarsFilter 
                        rating={rating} 
                        hover={hover} 
                        version={version} 
                        setRating={setRating}
                        setHover={setHover}
                        setVersion={setVersion}/>
                    </div>
                    <div className="border-t border-dark/30   w-full text-center p-3 flex justify-between items-center fixed bottom-0 left-0 right-0 z-50 bg-black px-4 md:static rounded-b-xl">
                        <p className="font-semibold cursor-pointer hover:opacity-60 transition-all duration-300 active:opacity-40 underline" onClick={handleReset}>Remove all</p>
                        <Button className="flex-1 max-w-[200px] hover:opacity-60 hover:bg-green-1/50 transition-all duration-300 active:opacity-40 bg-green-1" onClick={handleSave}>Filter</Button>  
                    </div>
                </div>
                
        </motion.div>

    )
}