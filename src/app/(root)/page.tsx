import Home from "@/components/home/Home";
import { auth } from "@/auth";
import { allBarbers } from "@/lib/actions/barber.action";
export default async function Page({searchParams}:{
  searchParams:{[key:string]:string | undefined}
}) {
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
}




