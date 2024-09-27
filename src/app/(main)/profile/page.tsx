
"use client"
import Profile from "@/components/profile/profile"
import LoadingAnimation from "@/assets/other/spinner"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSize } from "@/lib/hooks"
import ProfileM from "@/components/profile/mobile/profileMo"
import { fetchUser } from "@/lib/actions/user.action"
import { ToastAction } from "@/components/ui/toast"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
type Profile  = {
    id:string;
    image:string;
    name:string;
    isBarber:boolean;
    completed:boolean;
    createdAt:any;
    email:string;
    phoneNumber:string|null;
    comments:any[];
    barberId:string|null
}

export default function Page() {
    const [profile,setProfile] = useState<Profile>()
    const {data:session,status} = useSession()
    const router = useRouter()
    const size = useSize()
    useEffect(() => {
        if(status == "loading") return
        if(status!=="authenticated" ) {
            return  router.push("/login?next=profile")
        }
        const getuser = async() => {
            try {
                const res = await fetchUser(session?.user?.id as string)
                if(res) {
                    setProfile(res as Profile)
                }
            } catch (error:any) {
                toast({
                    variant:"destructive",
                    title:"Error",
                    description:error.message,
                    action:<ToastAction altText="Close">Close</ToastAction>
                })
            }
            
        }
        getuser()
    },[session,status,router])

    if(status == "loading" || !profile) {
        return (
            <div className="h-screen flex justify-center items-center flex-col gap-2">
                <LoadingAnimation containerClassName="!h-[300px]"/>
                <div className="flex flex-col gap-1 flex-1 h-full">
                    <p className="text-xs text-center">if loading take to mush reload</p>
                    <Button  onClick={() => window.location.href = `/profile`}>
                            reload
                    </Button>

                </div>
            </div>)
    }

    return (
        <>
            {profile&&size > 767 ? 
            <div className="md:pt-[5.4rem]">
                <Profile profile={profile}/>
            </div>
            :
            profile&&<ProfileM profile={profile}/>}
        </>
    )
}