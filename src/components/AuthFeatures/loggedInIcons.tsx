
import { useSession } from "next-auth/react"

import BarberIcons from "./barber/berberIcons";
import MessagesIcon from "./user/messagesIcon";
export default function LoggedInIcons() {
    const session = useSession() as any
    if(!session?.data?.user) return null
   
    return (
        <div>
            <div className="flex gap-4 text-xl">
                <MessagesIcon userId={session.data.user.id as string}/>
                {session.data.user.isBarber &&<BarberIcons />}
            </div>
        </div>
    )
}