
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import CompleteProfile from "@/components/complete/completeProfile"

export default async function Page() {
    const session = await auth()
    if(!session) return
    if((session?.user as any).completed) redirect("/")
    return (<CompleteProfile 
        userId={session?.user?.id} 
        image={session?.user?.image} 
        isBarber={(session?.user as any).isBarber}
        />)
}