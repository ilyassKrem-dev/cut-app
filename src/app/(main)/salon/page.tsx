"use client"
import Salon from "@/components/salon/salon"
import { useRouter } from "next/navigation"
import NoPermission from "../../../components/salon/other/noPermission"
import { useSession } from "next-auth/react"
import LoadingAnimation from "@/assets/other/spinner"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default  function Page() {
    const {data:session,status} = useSession()
    const router = useRouter()
    const [loading,setLoading] = useState<boolean>(false)
    
    useEffect(() => {
        if(status === "loading") return
        if(session === null) {
            return router.push('/login')
        }
        setLoading(true)
    }, [status, router,session])
    
    return (
    <>
        {loading&&session&&<>
            {session.user&&<Salon userId={session.user?.id}/>}
            {
            !(session.user as any).isBarber&&<NoPermission />
            }
        </>}
        {!loading&&
        <div className="h-screen flex justify-center items-center flex-col gap-1">
          <h1 className="font-bold text-lg"><LoadingAnimation /></h1>
          <p className="text-sm text-white/80">If i takes to long reload</p>
          <a href={`/`} className="w-[150px]">
              <Button className="w-full">Reload</Button>
          </a>
      </div>}
    </>)
    
    
}