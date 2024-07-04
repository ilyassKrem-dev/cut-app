
import { SetStateAction, useEffect, useState } from "react";
import {ReservesType} from "../reservesType"
import { cancelReservation } from "@/lib/actions/misc.action";
import { toast } from "@/components/ui/use-toast";
export default function CancelReserv({resId,userId,setReserves}:{
    resId:string;
    userId:string;
    setReserves:React.Dispatch<SetStateAction<ReservesType[] | null>>
}) {
    const [confirm,setConfirm] = useState<boolean>(false)
    const handleCancel = async() => {
        try {
            
            const res = await cancelReservation(userId,resId)
            if(res.success) {
                toast({
                    variant:"success",
                    title:"Canceled",
                    description:"Reservation Canceled"
                })
                setReserves((prev:any) => (prev?.filter((reserv:ReservesType) => reserv.id !== resId)))
            }
        } catch (error:any) {
            toast({
                variant:"destructive",
                title:"Error",
                description:error.message
            })
        }
    }
    useEffect(() => {
        const outOfBound = (e:MouseEvent) => {
            const overlay = document.querySelector(".cancel-tab")
            if(overlay && !overlay.contains(e.target as any)) {
                setConfirm(false)
            }
        }
        document.body.addEventListener("click",outOfBound)

        return () => document.body.removeEventListener("click",outOfBound)
    },[])
    return (
        <>
            <button className="bg-accent bg-opacity-70 text-white hover:bg-accent/60 transition-all duration-300 rounded-b-xl py-2 hover:opacity-60 active:bg-accent/40  md:rounded-br-xl md:rounded-b-none flex-1" onClick={() => setConfirm(true)}>Cancel</button>
            {confirm&&<div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50 ">
                    <div className=" w-72 rounded-lg overflow-hidden shadow-xl bg-[#09090b] cancel-tab">
                        <div className="flex flex-col items-center p-8 space-y-6 remove-del">
                            <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full text-white text-2xl font-bold cursor-pointer hover:opacity-60 transition-all duration-300" onClick={() => setConfirm(false)}>
                                <span>X</span>
                            </div>
                            <div className="text-center  text-white">
                                <p className="font-semibold">Cancel Confirmation</p>
                                <p>Are you sure you want to cancel?</p>
                            </div>
                        </div>
                        <div className="flex justify-center bg-red-500 text-white py-4 cursor-pointer hover:bg-red-600 transition-colors duration-300 hover:opacity-60">
                            <button className="focus:outline-none"
                            onClick={() => {
                                handleCancel();
                                setConfirm(false)
                            }} >Cancel</button>
                        </div>
                    </div>
            </div>}
        </>
    )
}