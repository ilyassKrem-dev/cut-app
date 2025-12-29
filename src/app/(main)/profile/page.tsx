import Profile from "@/components/profile/profile"
import { redirect } from "next/navigation"
import { fetchUser } from "@/lib/actions/user.action"

import { auth } from "@/auth"
import ClientPage from "./clientPage"
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

export default async function Page() {
    const session = await auth()
    if(!session) redirect("/login?next=profile")
    const profile = await fetchUser(session?.user?.id as string)
    

    return (
        <>
            <ClientPage profile={profile as Profile}/>
        </>
    )
}


export async function generateMetadata() {
    const session = await auth()
    const user = await fetchUser(session?.user?.id as string)

    return {
        title:`BarberCut | ${user?.name || "Profile"}`,
        description:`Welcome to ${user?.name || "your profile"} on BarberCut. Manage your personal information, view your appointments, and explore our grooming services. Keep your profile updated for the best experience!`

    }
}
