import { SetStateAction, useState } from "react";

import { motion } from "framer-motion";
import SearchCities from "@/assets/other/searchCities";
import { IoSearchOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useSearchParams,useRouter } from "next/navigation";
export default function SearchOverlay({setShow,show}:{
    setShow:React.Dispatch<SetStateAction<boolean>>;
    show:boolean;
}) {
    const [userInput,setUserInput] = useState<string>("")
    const [city,setCity] = useState<string>("")
    const router = useRouter()
    const searchParams = useSearchParams()
    const handleClick = (city:string) => {
        setUserInput(city)
        setCity(city)
    }
    const handleSearch = () => {
        
        if(!city) {
            return setShow(false)
        }
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        
        if(searchParams.get("city")) {
            current.set('city',city.toLowerCase())
            const search = current.toString();
            setShow(false)
            return router.push(`/?${search}`)
        }
        
        const search = current.toString();
        if(Array.from(current).length === 0) {
            setShow(false)
            return router.push(`/?city=${city.toLowerCase()}`)
        }
        setShow(false)
        router.push(`/?${search}&city=${city.toLowerCase()}`) 
    }
    const handleReset = () => {
        setUserInput("")
        setCity('')
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        current.delete("city")
        const search = current.toString()
        router.push(`/?${search}`)
    }
    return (
        <motion.div
            initial={{y:'-100%'}}
            animate={{y:"0"}}
           
            transition={{duration:0.3,ease:"easeInOut"}}
            className="fixed top-0 left-0 bottom-0 right-0 bg-[rgb(20,20,20)] z-50 flex flex-col items-center py-6 px-4 gap-10">
                <div className="flex items-center w-full justify-center">
                    <div className="text-base font-semibold border-white/20 rounded-full p-[0.2rem] 
                    px-[0.65rem] border-2 bg-black cursor-pointer hover:scale-105 hover:border-black hover:shadow-[0px_0px_6px_2px_rgb(255,255,255)] transition-all duration-300" onClick={() => setShow(false)}>
                        x
                    </div>
                    <h1 className="font-bold text-xl text-light text-center flex-1 mr-8">Search</h1>
                </div>
                <div className="flex-1 flex flex-col self-start w-full">
                    <div className="bg-black/70 rounded-xl p-6 gap-6 flex flex-col">
                        <h1 className=" text-xl font-semibold">Location</h1>
                        <div>
                            <SearchCities 
                            name="sm-searchcity"
                            setUserInput={setUserInput}
                            userInput={userInput}
                            handleClick={handleClick}
                            classNameInput="h-[50px]"
                            
                            />
                        </div>
                    </div>

                </div>
                <div className="bg-black fixed bottom-0 left-0 right-0 p-3 px-4">
                <div className="border-t border-dark/30   w-full text-center p-3 flex justify-between items-center fixed bottom-0 left-0 right-0 z-50 bg-black px-4 md:static rounded-b-xl">
                        <p className="font-semibold cursor-pointer hover:opacity-60 transition-all duration-300 active:opacity-40 underline" onClick={handleReset}>Remove all</p>
                        <Button className="flex-1 max-w-[200px] hover:opacity-60 hover:bg-green-1/50 transition-all duration-300 active:opacity-40 bg-green-1 flex gap-3 text-base" onClick={handleSearch}>
                        <IoSearchOutline className="text-xl"/>
                        Search
                        </Button>  
                    </div>
                </div>
            </motion.div>
    )
}