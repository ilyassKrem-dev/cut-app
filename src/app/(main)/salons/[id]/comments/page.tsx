"use client"
import LoadingAnimation from "@/assets/other/spinner"
import SalonComments from "@/components/salonsById/comments/salonComments"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

import {SalonCommentsType,UserCommentType} from "@/components/salonsById/salonType"
import { getUserComment } from "@/lib/actions/misc.action"
import { getBarberComments } from "@/lib/actions/barber.action"
import { Button } from "@/components/ui/button"
export default function Page() {
    const [salon,setSalon] = useState<SalonCommentsType | null>(null)
    const [userComment,setUserComment] = useState<UserCommentType>()
    const {data:session,status} = useSession()
    const pathname = usePathname()
    const paramId = pathname.split('/')[2]
    useEffect(() => {
        const getSalonComments = async() => {
            try {
                const res = await getBarberComments(paramId)
                if(res) setSalon(res as SalonCommentsType)
            } catch (error:any) {
                toast({
                    variant:"destructive",
                    title:"Error",
                    description:error.message
                })
            }
        }
        getSalonComments()
    },[paramId])
    useEffect(() => {
        if(!session) return
        const getSalonComments = async() => {
            try {
                const res = await getUserComment(session?.user?.id as string,paramId)
                if(res) setUserComment(res as any)
            } catch (error:any) {
                toast({
                    variant:"destructive",
                    title:"Error",
                    description:error.message
                })
            }
        }
        getSalonComments()
    },[paramId,session])
   
    if(status == "loading" || !salon) {
        return (
            <div className="h-screen flex justify-center items-center flex-col gap-2">
                <LoadingAnimation containerClassName="!h-[500px]"/>
                <div className="flex flex-col gap-1 flex-1 h-full">
                    <p className="text-xs text-center">if loading take to mush reload</p>
                    <Button  onClick={() => window.location.href = `/salons/${paramId}/comments`}>
                            reload
                    </Button>

                </div>
            </div>
        )
    }
    return (
        <>
            {salon&&<SalonComments 
            salon={salon} 
            userId={session?.user?.id}
            userComment={userComment}
            setSalon={setSalon}/>}
        </>
    )
}