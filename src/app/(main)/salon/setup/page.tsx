"use client"
import Setup from "@/components/salon/setup/Setup"
import NoPermission from "@/components/salon/other/noPermission"
import { useSession } from "next-auth/react"
import LoadingAnimation from "@/assets/other/spinner"
import { useEffect, useState } from "react"
import { useSearchParams,useRouter } from "next/navigation"
import { fetchbarberExistence } from "@/lib/actions/barber.action"
import { Button } from "@/components/ui/button"
export default  function Page() {
    const {data:session,status} = useSession() as any
    const router = useRouter()
    const searchParams = useSearchParams()
    const [userBar , setUserBar] = useState<boolean|null>(null)
    useEffect(() => {
        if(session === null) {
            router.push('/')
        }
        if (status === "unauthenticated") {
            router.push("/")
        }
        if(!searchParams.get('fiId') || session&& searchParams.get('fiId') !==session.user.id) {
            router.push("/")
        }
    }, [status, router,searchParams,session])
    useEffect(() => {
        if(!session) return
        const getBabrer = async() => {
            const res =await fetchbarberExistence(session.user.id)
            if(res.success) return router.push('/')
            setUserBar(false)
        }
        getBabrer()
    },[session])

    if(status === "loading" || userBar) {
        return (
            <div className="py-36 flex justify-center items-center flex-col gap-2">
                <LoadingAnimation containerClassName="!h-[500px]"/>
                <div className="flex flex-col gap-1 flex-1 h-full">
                    <p className="text-xs text-center">if loading take to mush reload</p>
                    <Button  onClick={() => window.location.href = `/salon/setup`}>
                            reload
                    </Button>

                </div>
            </div>
        )
    }
    
    if(session && !session.user.isBarber) {
        return <NoPermission />
    }
    
    return  ( 
    <>{session&&session.user&&userBar&&<Setup 
        userId={session.user?.id} 
        userName={session.user?.name} 
        userImage={session.user?.image}/>}</>
    )
}