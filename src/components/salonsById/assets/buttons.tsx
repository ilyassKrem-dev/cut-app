"use client"
import { Button } from "@/components/ui/button";
import { useLoginContext } from "@/assets/wrappers/loginWrapper";
import { useRouter } from "next/navigation";
import { talkToBarber } from "@/lib/actions/barber.action";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useState } from "react";
import Reserve from "./reservation/reserve";


export default function SalonButtons({barberPrices,userId,barberId,barberUserId,barberTime}:{
    barberPrices:number[];
    userId:string|null|undefined;
    barberId:string;
    barberUserId?:string;
    barberTime:{
        times:string[];
        days:string[];
    }
}) {
    const {toast} = useToast()
    const {setShowLogin} = useLoginContext()
    const [show,setShow] = useState<boolean>(false)
    const router = useRouter()
    const handleClick = async() => {
        if(!userId) {
            return setShowLogin(true)
        }
        // try {
        //     const res = await talkToBarber({userId,barberId})
        //     if(res?.message) {
        //         return toast({
        //             title:"Message",
        //             description:`${res.message}`,
        //             action: <ToastAction altText="Close">Close</ToastAction>,
        //         })
        //     }
        //     if(res.success) {
        //         router.push(`/messages/${res.success}`)
        //     }
        // } catch (error:any) {
            
        //     toast({
        //         variant:"destructive",
        //         title:"Error",
        //         description:`Failed to Continue`,
        //         action: <ToastAction altText="Close">Close</ToastAction>,
        //     })
        // }
        setShow(true)
    }


    return (
        <>
            <div className="hidden sm:flex flex-1 max-w-[400px] h-fit">
                <div className="bg-black border border-white/20 rounded-lg flex justify-center p-3 py-6 flex-col gap-8  items-center w-full shadow-[0px_0px_4px_1px_rgba(255,255,255,0.2)]">
                    <div className="text-center">
                        <p className="font-bold text-xl">{barberPrices[0]}DH - {barberPrices[1]}DH</p>
                        <p className="text-sm mt-1 text-gray-400">
                            {barberTime.times[0]}-{barberTime.times[1]}
                            
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
                            {barberTime.times[0]}-{barberTime.times[1]}
                        </p>

                    </div>
                    {userId !== barberUserId&&<Button onClick={handleClick}  
                    className="bg-green-1  hover:opacity-80 hover:bg-green-1 flex-1">Talk</Button>}
                </div>
            </div>
            {!show&&<Reserve
            barberTime={barberTime}
            barberId={barberId} 
            userId={userId as string}
            setShow={setShow}/>}
        </>
    )

        
}