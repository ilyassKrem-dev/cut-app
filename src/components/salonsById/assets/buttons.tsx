"use client"
import { Button } from "@/components/ui/button";
import { useLoginContext } from "@/assets/wrappers/loginWrapper";
import { useRouter } from "next/navigation";



export default function SalonButtons({barberPrices,barberTimes,userId}:{
    barberPrices:number[];
    barberTimes:string[]
    userId:string|null|undefined
}) {
    
    const {setShowLogin} = useLoginContext()
    const router = useRouter()
    const handleClick = () => {
        if(!userId) {
            return setShowLogin(true)
        }
    }
    return (
        <>
            <div className="hidden sm:flex flex-1 max-w-[400px] h-fit">
                <div className="bg-black border border-white/20 rounded-lg flex justify-center p-3 py-6 flex-col gap-8  items-center w-full shadow-[0px_0px_4px_1px_rgba(255,255,255,0.2)]">
                    <div className="text-center">
                        <p className="font-bold text-xl">{barberPrices[0]}DH - {barberPrices[1]}DH</p>
                        <p className="text-sm mt-1 text-gray-400">
                            {barberTimes[0]}-{barberTimes[1]}
                            
                        </p>
                    </div>
                    <Button onClick={handleClick} className="bg-green-1  hover:opacity-80 hover:bg-green-1 w-full">Talk</Button>
                </div>
            </div>
            <div className="sm:hidden fixed z-50 bottom-0 right-0 left-0 bg-black">
                <div className="flex justify-between items-center px-4 py-3 ">
                    <div className="flex flex-col flex-1 max-[331px]:text-sm">
                        <p className="font-bold">{barberPrices[0]}DH - {barberPrices[1]}DH</p>
                        <p className="text-xs mt-1 text-gray-400">
                            {barberTimes[0]}-{barberTimes[1]}
                        </p>

                    </div>
                    <Button onClick={handleClick}  
                    className="bg-green-1  hover:opacity-80 hover:bg-green-1 flex-1">Talk</Button>
                    
                </div>
            </div>
        </>
    )

        
}