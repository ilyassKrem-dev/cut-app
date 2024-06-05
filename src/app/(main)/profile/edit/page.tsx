
import ProfileEdit from "@/components/profile/edit/profileEdit"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { fetchUser } from "@/lib/actions/user.action"
export default async function Page() {
    const session = await auth()
    if(!session) redirect("/login?next=profile")
    const user = await fetchUser(session?.user?.id as string) as any
    if(!user) redirect("/")
    let userDetails = {
        id:user.id,
        name:user.name,
        email:user.email,
        number:user.phoneNumber.split("212")[1]|| "",
        image:user.image
    }
    return (
        <ProfileEdit userDetails={userDetails}/>
    )
}