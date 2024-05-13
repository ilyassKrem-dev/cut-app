
import { useSession } from "next-auth/react"
import { LuMessagesSquare } from "react-icons/lu";
import Link from "next/link";
import BarberIcons from "./barber/berberIcons";
export default function LoggedInIcons() {
    const session = useSession() as any
    if(!session?.data?.user) return null
   
    return (
        <div>
            <div className="flex gap-4 text-xl">
                <Link href={"/salon"} className="group relative">
                    <LuMessagesSquare className=" hover:opacity-60 transition-all duration-300 cursor-pointer"/>
                    <div className="absolute text-xs bg-dark rounded-lg -left-[25px] -bottom-8 p-1 hidden group-hover:block text-gray-300">
                        <p>messages</p>
                    </div>
                </Link>
                {session.data.user.isBarber &&<BarberIcons />}
            </div>
        </div>
    )
}