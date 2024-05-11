"use client"
import Salon from "@/components/salon/salon"

import { useRouter } from "next/navigation"
import NoPermission from "../../../components/salon/other/noPermission"
import { useSession } from "next-auth/react"
import LoadingAnimation from "@/assets/other/spinner"
import { useEffect } from "react"
export default  function Page() {
    const {data:session,status} = useSession() as any
    const router = useRouter()
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/")
        }
    }, [status, router])
    if(status === "loading") {
        return (
        <div className="pt-36 md:pt-0 h-screen">
            <LoadingAnimation/>
        </div>
        )
    }
    
    if(!session.user.isBarber) {
        return <NoPermission />
    }
    
    return <Salon userId={session.user?.id}/>
}