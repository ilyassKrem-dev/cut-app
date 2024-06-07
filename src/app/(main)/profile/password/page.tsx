import ProfilePassword from "@/components/profile/password/profilePassword"

import { auth } from "@/auth"
import { redirect } from "next/navigation"
export default async function Page() {
    const session = await auth()
    if(!session) redirect("/login")

    return (
        <ProfilePassword userId={session?.user?.id as string}/>
    )
}