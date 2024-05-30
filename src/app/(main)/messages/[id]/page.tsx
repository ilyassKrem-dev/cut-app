
import Chat from "@/components/messages/chat"
import { auth } from "@/auth"

export default async function Page({params}:{
    params:{id:string | undefined}|undefined
}) {
    try {
        const session = await auth();
    
        return (
          <div className="w-full">
            <Chat convoId={params?.id} userId={session?.user?.id} isBarber={(session?.user as any).isBarber}/>
          </div>
        );
      } catch (error) {
        console.error("Failed to fetch session:", error);
        return (
          <div>
            <p>Error loading page. Please try again later.</p>
          </div>
        );
      }
}