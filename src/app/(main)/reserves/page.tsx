"use client"
import { useSession } from "next-auth/react"
import LoadingAnimation from "@/assets/other/spinner"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { getReservations } from "@/lib/actions/misc.action"
import Reserves from "@/components/reserves/reserves"
import {ReservesType} from "@/components/reserves/reservesType"
import { Button } from "@/components/ui/button"


export default function Page() {
    const [reserves,setReserves] = useState<ReservesType[] | null>(null)
    
    const {data:session,status} = useSession()
    const router = useRouter()
    useEffect(() => {
        if(!session) return
        if(session && status !="authenticated") {
            return router.push('/login?next=reserves')
        }
        const fetchReserves = async() => {
            try {
                const res = await getReservations(session?.user?.id as string)
                setReserves(res as any)
            } catch (error:any) {
                toast({
                    variant:"destructive",
                    title:"Error",
                    description:error.message
                })
            }
        }
        fetchReserves()
     },[session,status])
    if(status == "loading" || !reserves) {
        return (
            <div className="py-36 flex justify-center items-center flex-col gap-2">
                <LoadingAnimation containerClassName="!h-[500px]"/>
                <div className="flex flex-col gap-1 flex-1 h-full">
                    <p className="text-xs text-center">if loading take to mush reload</p>
                    <Button  onClick={() => window.location.href = `/reserves`}>
                            reload
                    </Button>   

                </div>
            </div>
        )
    }

    return (
        <>
            {reserves&&<Reserves reserves={reserves} setReserves={setReserves}/>}
        </>
    )
}