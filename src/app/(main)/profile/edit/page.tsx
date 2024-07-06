
import ProfileEdit from "@/components/profile/edit/profileEdit"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { fetchUser } from "@/lib/actions/user.action"
import Link from "next/link"
import { Button } from "@/components/ui/button"
export default async function Page() {
    try {
        const session = await auth()
        if(!session) redirect("/login?next=profile")
        
        const user = await fetchUser(session?.user?.id as string) as any
       
        if(!user) redirect("/")
        let userDetails = {
            id:user.id || "",
            name:user.name || "",
            email:user.email || "",
            number:user.phoneNumber ? user.phoneNumber.split("212")[1]: "",
            image:user.image || ""
        }
        
        return (
            <ProfileEdit userDetails={userDetails}/>
        )
        
    } catch (error) {
        return (
            <div className="h-screen flex justify-center items-center flex-col gap-1">
                <h1 className="font-bold text-lg">Error loading page</h1>
                <a href={`/profile/edit`} className="w-[150px]">
                    <Button className="w-full">Reload</Button>
                    
                </a>
            </div>
        )
    }
}