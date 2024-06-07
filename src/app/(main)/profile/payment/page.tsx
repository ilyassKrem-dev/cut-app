
import Link from "next/link"


export default function Page() {

    return (
        <div className="h-screen">
            <div className="flex h-full justify-center items-center">
                <div className="flex flex-col gap-6 items-center">
                    <h1 className="text-xl text-center">This page is  unavailable right now</h1>
                    <Link href={"/"} className="bg-black border border-white/10 rounded-xl  px-16 p-3 hover:opacity-60 hover:bg-white/60 transition-all duration-300 active:opacity-50 active:bg-white/80">
                        Go back
                    </Link>

                </div>
            </div>
        </div>
    )
}