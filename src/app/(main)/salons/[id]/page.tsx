
import SalonLayout from "@/components/salonsById/salonLayout";
export default async function Page({params}:{
    params:{id:string}
}) {
    return <SalonLayout id={params.id}/>
    
}