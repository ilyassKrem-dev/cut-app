
import { auth } from "@/auth";
import SalonLayout from "@/components/salonsById/salonLayout";
import { getBaberById } from "@/lib/actions/barber.action";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({params}:{
    params:{id:string}
}) {

    const session = await auth()
    const barber = await getBaberById(params.id)
    return <SalonLayout id={params.id} session={session} barber={barber as any}/>
    
}

export async function generateMetadata({params,searchParams}:Props):Promise<Metadata> {
    const {id} = await params
    const barber = await getBaberById(id)

    return {
        title:`BarberCut | ${barber?.salonName || "Salon"}`,
        description:`Welcome to ${barber?.salonName || "our salon"} on BarberCut. Discover top-notch grooming services, expert barbers, and a stylish atmosphere. Book your appointment today for a fresh new look!`,
        openGraph:{
            images:barber.images
        }

    }
}