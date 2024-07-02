"use client"
import Salon from "@/components/salon/salon"

import { useRouter } from "next/navigation"
import NoPermission from "../../../components/salon/other/noPermission"
import { useSession } from "next-auth/react"
import LoadingAnimation from "@/assets/other/spinner"
import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
export default  function Page() {
    try {
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
        
        return (
        <>
            {session&&session.user&&<Salon userId={session.user?.id}/>}
        </>)
        
    } catch (error) {
        return (
            <div className="py-36 flex justify-center items-center flex-col gap-1">
                <h1 className="font-bold text-lg">Error loading page</h1>
                <Link href={`/salon`} className="w-[150px]">
                    <Button className="w-full">Reload</Button>
                    
                </Link>
            </div>
        )
    }
}