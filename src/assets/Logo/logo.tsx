import Link from "next/link"

export default function Logo() {

    return (
        <Link href={"/"} className=" text-xl text-green-1 hidden md:flex hover:opacity-60 transition-all duration-300 active:opacity-50">
            Barber<span className="font-mono">Cut </span>
        </Link>
    )
}