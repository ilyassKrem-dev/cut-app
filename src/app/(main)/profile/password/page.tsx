import ProfilePassword from "@/components/profile/password/profilePassword"

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
export default async function Page() {
    try {
        const session = await auth()
        if(!session) redirect("/login")
    
        return (
            <ProfilePassword userId={session?.user?.id as string}/>
        )
        
    } catch (error) {
        return (
            <div className="h-screen flex justify-center items-center flex-col gap-1">
                <h1 className="font-bold text-lg">Error loading page</h1>
                <Link href={`/profile/password`} className="w-[150px]">
                    <Button className="w-full">Reload</Button>
                    
                </Link>
            </div>
        )
    }
}