import SalonComments from "@/components/salonsById/comments/salonComments"


import { getUserComment } from "@/lib/actions/misc.action"
import { getBarberComments } from "@/lib/actions/barber.action"
import { auth } from "@/auth"
import { Metadata } from "next"

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({params}:{
    params:{
        id:string
    }
}) {
    const {id} = params
    const session = await auth()
    const [salon,userComment] = await Promise.all([getBarberComments(id),getUserComment(session?.user?.id as string,id)])
    
    return (
        <>
            {salon&&<SalonComments 
            salonData={salon as any} 
            userId={session?.user?.id}
            userComment={userComment}
            />}
        </>
    )
}

export async function generateMetadata({params,searchParams}:Props):Promise<Metadata> {
    const {id} = await params
    const salon = await getBarberComments(id)

    return {
        title:`BarberCut | ${salon?.salonName || "Salon"} | comments`,
        description:`Welcome to ${salon?.salonName || "our salon"} on BarberCut. Discover top-notch grooming services, expert barbers, and a stylish atmosphere. Book your appointment today for a fresh new look!`,
       
    }
}