"use client"
import Home from "@/components/home/Home";
import { allBarbers } from "@/lib/actions/barber.action";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LoadingAnimation from "@/assets/other/spinner";
type barberType = {
  id: string; 
  address: string; 
  city: string;
  images:string[];
  latitude: number; 
  longitude: number; 
  time: string[]; 
  Prices: number[]; 
  salonName: string; 
  ratings: number
}
export default function Page() {
  const searchParams = useSearchParams()
  const {data:session} = useSession()
  const [barbers,setBarbers] = useState<barberType[] | null>(null)
  useEffect(() => {
    const getBarbers = async() => {
      const res = await allBarbers(
        {
          filters:{
            city:searchParams?.get("city"),
            rating:searchParams?.get("rating"),
            min:searchParams?.get("min"),
            max:searchParams?.get("max"),
            operat:searchParams?.get("equ")
          }
        }
      )
      setBarbers(res)
    }
    getBarbers()
  },[searchParams])
  return (
    <>
      {barbers&&<div className="md:py-48 p-4 py-32">
       <Home
        userId={session?.user?.id as string || null}
        barbers={barbers}
        />
      </div>}
      {!barbers&&<div className="h-screen flex justify-center items-center flex-col gap-1">
          <h1 className="font-bold text-lg"><LoadingAnimation /></h1>
          <p className="text-sm text-white/80">If i takes to long reload</p>
          <a href={`/`} className="w-[150px]">
              <Button className="w-full">Reload</Button>
          </a>
      </div>}
    </>
    
  );

}




