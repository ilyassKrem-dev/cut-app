
import Chat from "@/components/messages/chat"
import { auth } from "@/auth"
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page({params}:{
    params:{id:string | undefined}|undefined
}) {
    try {
        const session = await auth();
        if(!session) redirect("/")
        return (
          <div className="w-full">
            <Chat 
            convoId={params?.id} 
            userId={session?.user?.id} 
            isBarber={(session?.user as any).isBarber}
            barberId={(session?.user as any).barberId}/>
          </div>
        );
      } catch (error) {
        return (
            <div className="py-36 flex justify-center items-center flex-col gap-1">
                <h1 className="font-bold text-lg">Error loading page</h1>
                <a href={`/messages/${params?.id}`} className="w-[150px]">
                    <Button className="w-full">Reload</Button>
                    
                </a>
            </div>
        );
      }
}