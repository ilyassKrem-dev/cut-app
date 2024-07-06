
import { getBaberById } from "@/lib/actions/barber.action"
import SalonId from "@/components/salonsById/salonId"
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SalonType } from "@/components/salonsById/salonType";
export default async function Page({params}:{
    params:{id:string}
}) {
    try {
        let barber;
        const session = await auth()
        try {
            const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
            const timeoutPromise = timeout(5000).then(() => { throw new Error("Request timed out"); });
            const barberPromise = await getBaberById(params.id)
            barber = await Promise.race([barberPromise, timeoutPromise]);
        } catch (error) {
            redirect("/")
        }
        
        return <SalonId 
            barber={barber as SalonType} 
            userId={session?.user?.id}
            barberUserId={barber.userId}/>
    } catch (error) {
        return (
            <div className="h-screen flex justify-center items-center flex-col gap-1">
                <h1 className="font-bold text-lg">Error loading page</h1>
                <a href={`/salons/${params.id}`} className="w-[150px]">
                    <Button className="w-full">Reload</Button>
                    
                </a>
            </div>
        )
    }
    
}