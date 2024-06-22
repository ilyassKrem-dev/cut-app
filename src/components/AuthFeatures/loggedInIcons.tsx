
import { useSession } from "next-auth/react"
import { FaRegHeart,FaHeart } from "react-icons/fa"
import BarberIcons from "./barber/berberIcons";
import MessagesIcon from "./user/messagesIcon";
import Link from "next/link";
export default function LoggedInIcons() {
    const session = useSession() as any
    if(!session?.data?.user) return null
   
    return (
        <div>
            <div className="flex gap-4 text-xl">
                <Link href={"/favorites"} className="group relative">
                    <FaRegHeart  className=" hover:opacity-60 transition-all duration-300 cursor-pointer"/>
                    <div className="absolute text-xs bg-dark rounded-lg -left-[25px] -bottom-8 p-1 hidden group-hover:block text-gray-300 px-2">
                        <p>Favorites</p>
                    </div>
                </Link>

                <MessagesIcon userId={session.data.user.id as string}/>
                {session.data.user.isBarber &&<BarberIcons />}
            </div>
        </div>
    )
}