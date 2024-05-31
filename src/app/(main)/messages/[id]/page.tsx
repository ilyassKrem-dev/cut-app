
import Chat from "@/components/messages/chat"
import { auth } from "@/auth"
import { redirect } from "next/navigation";

export default async function Page({params}:{
    params:{id:string | undefined}|undefined
}) {
    try {
        const session = await auth();
        if(!session) redirect("/")
        return (
          <div className="w-full">
            <Chat convoId={params?.id} userId={session?.user?.id} isBarber={(session?.user as any).isBarber}/>
          </div>
        );
      } catch (error) {
        console.error("Failed to fetch session:", error);
        return (
          <div>
            <h1>Error loading page. Please try again later.</h1>
          </div>
        );
      }
}