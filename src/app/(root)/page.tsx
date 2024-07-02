import Home from "@/components/home/Home";
import { auth } from "@/auth";
import { allBarbers } from "@/lib/actions/barber.action";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default async function Page({searchParams}:{
  searchParams:{[key:string]:string | undefined}
}) {
  try {
      const session = await auth() as any
    
    
      const barbers = await allBarbers(
        {
          filters:{
            city:searchParams?.city,
            rating:searchParams?.rating,
            min:searchParams?.min,
            max:searchParams?.max,
            operat:searchParams?.equ
          }
        }
      )
      
      return (
        <div className="md:py-48 p-4 py-32">
          <Home
          userId={session?.user?.id as string || null}
          barbers={barbers}
          />
        </div>
      );
    
  } catch (error) {
    return (
      <div className="h-screen flex justify-center items-center flex-col gap-1">
          <h1 className="font-bold text-lg">Error loading page</h1>
          <Link href={`/`} className="w-[150px]">
              <Button className="w-full">Reload</Button>
              
          </Link>
      </div>
  )
  }
}




