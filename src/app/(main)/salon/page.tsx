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
        if(session === null) {
            router.push('/login')
        }
        if (status === "unauthenticated") {
            router.push("/")
        }
    }, [status, router,session])
    if(status === "loading") {
        return (
        <div className="pt-36 md:pt-0 h-screen">
            <LoadingAnimation/>
        </div>
        )
    }
    
    if(session && !session.user.isBarber) {
        return <NoPermission />
    }
    
    return <Salon userId={session.user?.id}/>
}