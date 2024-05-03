import { SetStateAction, useEffect, useState } from "react";
import cities from "./ma.json"
import { Input } from "@/components/ui/input";
import { useSearchParams ,useRouter} from "next/navigation";
export default function Location({enter,setEnter,scrolling}:{
    enter:boolean;
    setEnter:React.Dispatch<SetStateAction<boolean>>;
    scrolling:boolean
}) {
    const [show,setShow] = useState<boolean>(false)
    const [userInput,setUserInput] = useState<string>("")
    const [city,setCity] = useState<string>("")
    const searchParams = useSearchParams()
    const cityString = searchParams.get('city')
    const router = useRouter()
    let maCities = userInput.length !==0 ? cities.filter(city => city.city.toLowerCase().includes(userInput)) : []
    const handleClick = (city:string) => {
        setCity(city.toLowerCase())
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
        router.push(`/?${search}&city=${city.toLowerCase()}`)
        setShow(false)
    }
    const handleRemove = () => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        current.delete('city')
        router.push(`/?${current.toString()}`)
        setShow(false)
    }
    
    return (
        <>
            <div className=" pl-6  py-3 cursor-pointer hover:opacity-60 transition-all duration-300 hover:bg-gray-400/50 rounded-full flex-1 group relative h-full flex flex-col gap-1 justify-center" 
                onMouseEnter={() => setEnter(true)}
                onMouseLeave={() => setEnter(false)}
                onClick={() => setShow(!show)}>
                    <div className={`flex flex-col gap-1 border-r
                    ${enter && "border-r-0"} 
                    `}>
                        <h4 className="font-bold text-sm cursor-pointer">Location</h4>
                        {!scrolling?
                        <p className="text-gray-400 text-xs cursor-pointer capitalize">{cityString?cityString:"Search location"}</p>
                        :
                        cityString?
                        <p className="text-gray-400 text-xs cursor-pointer capitalize">{cityString?cityString:"Search location"}</p>
                        :
                        ""
                        }
                        
                    </div>
                    
            </div>
            {show&&
            <div className={`absolute  top-20 bg-lighter rounded-xl  max-w-[392px] ${scrolling?"w-[300px]":"w-[392px]"}`}>
                <div className="flex flex-col gap-3 p-3">
                    <h1 className="font-bold">Search by city</h1>
                    {cityString&&
                    <div className=" capitalize flex justify-between items-center">
                        <p className="font-semibold pl-1">{cityString}</p>
                        <p className=" border-accent 
                        p-[0.1rem] px-[0.5rem]  rounded-full text-accent border cursor-pointer hover:bg-accent/50 hover:text-white transition-all duration-300 hover:border-white" onClick={handleRemove}>x</p>
                    </div>}
                    <div className="flex-wrap  gap-2 flex  items-center">
                        <Input type="text" placeholder="City" onChange={(e) => setUserInput(e.target.value)}/>
                        {maCities.length !==0&&<div className="p-2 flex flex-col gap-2 w-full">
                            {maCities.slice(0,5).map((city:any,index:number) => {
                                return (
                                    <div key={index} className=" cursor-pointer hover:opacity-40 hover:bg-black/30 w-full p-1 rounded-xl" onClick={() => handleClick(city.city)}>
                                        {city.city}
                                    </div>
                                )
                            })}
                        </div>}
                    </div>

                </div>
            </div>}
        </>
    )
}