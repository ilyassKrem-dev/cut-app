"use client"
import { useSession } from "next-auth/react"
import LoadingAnimation from "@/assets/other/spinner"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { getReservations } from "@/lib/actions/misc.action"
import Reserves from "@/components/reserves/reserves"
import {ReservesType} from "@/components/reserves/reservesType"


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
    if(status == "loading") {
        return (
            <div className="h-screen justify-center flex items-center">
                <LoadingAnimation />
            </div>
        )
    }

    return (
        <>
            {reserves&&<Reserves reserves={reserves} setReserves={setReserves}/>}
        </>
    )
}