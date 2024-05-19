
import { getBaberById } from "@/lib/actions/barber.action"
import SalonId from "@/components/salonsById/salonId"
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Page({params}:{
    params:{id:string}
}) {
    let barber;
    const session = await auth()
    try {
        barber = await getBaberById(params.id)
    } catch (error) {
        redirect("/")
    }
    
    return <SalonId barber={barber} userId={session?.user?.id}/>
}