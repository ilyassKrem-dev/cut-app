"use client"
import Setup from "@/components/salon/setup/Setup"
import NoPermission from "@/components/salon/other/noPermission"
import { useSession } from "next-auth/react"
import LoadingAnimation from "@/assets/other/spinner"
import { useEffect } from "react"
import { useSearchParams,useRouter } from "next/navigation"
export default  function Page() {
    const {data:session,status} = useSession() as any
    const router = useRouter()
    const searchParams = useSearchParams()
    
    useEffect(() => {
        if(session === null) {
            router.push('/login')
        }
        if (status === "unauthenticated") {
            router.push("/login")
        }
        if(!searchParams.get('fiId') || session&& searchParams.get('fiId') !==session.user.id) {
            router.push("/")
        }
    }, [status, router,searchParams,session])
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
    
    return  ( 
    <>{session&&session.user&&<Setup 
        userId={session.user?.id} 
        userName={session.user?.name} 
        userImage={session.user?.image}/>}</>
    )
}