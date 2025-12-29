import Home from "@/components/home/Home";
import { allBarbers } from "@/lib/actions/barber.action";
import { Button } from "@/components/ui/button";
import LoadingAnimation from "@/assets/other/spinner";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"BarberCut | Home"
}



export default async function Page({searchParams}:{
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth()
  const {city,rating,min,max,equ} = searchParams
  const barbers = await allBarbers(
        {
          filters:{
            city,
            rating,
            min,
            max,
            operat:equ
          }
        }
    )
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




