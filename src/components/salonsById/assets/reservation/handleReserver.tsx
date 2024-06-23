import { Button } from "@/components/ui/button";
import { SetStateAction, useState } from "react";

import LoadingAnimation from "@/assets/other/spinner";

import { useToast } from "@/components/ui/use-toast";
import { addReservation } from "@/lib/actions/reservation.action";
import { talkToBarber } from "@/lib/actions/barber.action";
import { ToastAction } from "@/components/ui/toast";
export default function HandleReserve({ids,day,time,price,setShow,barberPrices,setSuccess,setConvoId}:{
    ids:{
        userId:string;
        barberId:string
    }
    day:string;
    time:string;
    price:number;
    barberPrices:number[]
    setShow:React.Dispatch<SetStateAction<boolean>>;
    setSuccess:React.Dispatch<SetStateAction<boolean>>;
    setConvoId:React.Dispatch<SetStateAction<string>>
}) {
    const [loading,setLoading] = useState<boolean>(false)
    const {toast} = useToast()
    const handleReseve = async() => {
        if(!day||!time||!price ) return
        if(price < barberPrices[0] || price > barberPrices[1]) {
            return  toast({
                variant:"destructive",
                title:"Error",
                description:"Price should be between the range provided"
            })
        }
        if(loading) return
        setLoading(true)
        try {
            const res = await addReservation({
                userId:ids.userId,
                barberId:ids.barberId,
                details:{
                    time,
                    price,
                    date:day
                }
            })
            if(res.success) {
                toast({
                    variant:"success",
                    title:"Reserved",
                    description:"Your reservation has been added"
                })
                const resChat = await talkToBarber({userId:ids.userId,barberId:ids.barberId})
                if(resChat?.message) {
                    return toast({
                        title:"Message",
                        description:`${resChat.message}`,
                        action: <ToastAction altText="Close">Close</ToastAction>,
                    })
                }
                setConvoId(resChat.success as string)
                setLoading(false)
                setSuccess(true)
            }
        } catch (error:any) {
            setLoading(false)
            toast({
                variant:"destructive",
                title:"Error",
                description:error.message
            })
        }
    }
    return (
        <>
            <div className={`self-end fixed bottom-0 left-0 right-0 border-t border-white/20 py-3 flex justify-end px-6 md:static md:w-full    `}>
                <Button
                disabled={!day||!time||!price}
                onClick={handleReseve}
                className={`bg-green-1/80 hover:bg-green-1/60 hover:opacity-60 transition-all duration-300 active:opacity-50 px-5 w-[200px]   ${!day&&!time&&!price ? "cursor-not-allowed":"cursor-pointer"}`}>
                {loading?<LoadingAnimation />:"Reserve"}
                </Button>
            </div>
        
        </>
)
}