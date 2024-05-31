
"use client"
import Profile from "@/components/profile/profile"
import LoadingAnimation from "@/assets/other/spinner"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
export default function Page() {
    const {data:session,status} = useSession()
    const router = useRouter()
    useEffect(() => {
        if(session) return
        if(status == "unauthenticated") {
            router.push("/login?next=profile")
        }
    },[session,status])
    if(status == "loading") {
        return (<div className=" justify-center items-center w-full flex-col h-screen" >
            <LoadingAnimation />
        </div>)
    }
    return (
        <>
            {session && 
            <div className="md:pt-[5.4rem]">
                <Profile userId={session?.user?.id as string}/>
            </div>}
        </>
    )
}