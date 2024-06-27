"use client"
import Favorites from "@/components/favorites/favorites"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import LoadingAnimation from "@/assets/other/spinner"
import { useRouter } from "next/navigation"
import { getAllFavorites } from "@/lib/actions/user.action"
import { useToast } from "@/components/ui/use-toast"
type favorites = {
    id:string;
    barber:{
        id:string
        images:string;
        Prices:string[];
        salonName:string;
        time:string[]
    }
}
export default function Page() {
    const {data:session,status} = useSession()
    const [favorites,setFavorites] = useState<favorites[] | null>(null)
    const router = useRouter()
    const {toast} = useToast()
    useEffect(() => {
        if(!session) return
        if(session &&status !="authenticated") {
            return router.push("/login")
        }
        const getFavorites = async () => {
            try {
                const res = await getAllFavorites(session?.user?.id as string)
                if(res) setFavorites(res as any)
            } catch (error:any) {
                toast({
                    variant:"destructive",
                    title:"Error",
                    description:error.message
                })
            }
        }
        getFavorites()
    },[session,status])
    
    if(status === "loading" || !favorites) {
        return (
            <div className="h-screen flex justify-center items-center">
                <LoadingAnimation />
            </div>
        )
    }
    return (
        <>
            {favorites&&<Favorites 
            favorites={favorites} 
            userId={session?.user?.id as string}
            setFavorites={setFavorites}/>
            
            }
        </>
    )
}