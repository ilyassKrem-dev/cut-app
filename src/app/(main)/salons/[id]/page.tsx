
import { getBaberById } from "@/lib/actions/barber.action"
import SalonId from "@/components/salonsById/salonId"
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page({params}:{
    params:{id:string}
}) {
    try {
        let barber;
        const session = await auth()
        try {
            barber = await getBaberById(params.id)
        } catch (error) {
            redirect("/")
        }
        
        return <SalonId 
            barber={barber} 
            userId={session?.user?.id}
            barberUserId={barber.userId}/>
    } catch (error) {
        return (
            <div className="h-screen flex justify-center items-center">
                <h1 className="font-bold text-lg">Error loading page</h1>
                <Link href={`/salons/${params.id}`} className="w-[150px]">
                    <Button className="w-full">Reload</Button>
                
                </Link>
            </div>
        )
    }
    
}