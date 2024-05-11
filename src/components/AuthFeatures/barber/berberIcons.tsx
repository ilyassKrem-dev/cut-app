
import { RiHomeLine } from "react-icons/ri";
import Link from "next/link";

export default function BarberIcons() {

    return (
        <>
            <Link href={"/salon"} className="group relative">
                <RiHomeLine className=" hover:opacity-60 transition-all duration-300 cursor-pointer"/>
                <div className="absolute text-xs bg-dark rounded-lg -left-[8.5px] -bottom-8 p-1 hidden group-hover:block text-gray-300">
                    <p>salon</p>
                </div>
            </Link>
        </>
    )
}