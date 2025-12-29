"use client"

import ProfileM from "@/components/profile/mobile/profileMo"
import Profile from "@/components/profile/profile"
import { useSize } from "@/lib/hooks"

export default function ClientPage({profile}:{profile:any}) {
    const size = useSize()

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