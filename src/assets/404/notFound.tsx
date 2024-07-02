import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function  NotFound({err}:{
    err?:string
}) {

    return (
        <div className="flex items-center justify-center flex-col gap-5 py-36">
            <h1 className="font-bold text-3xl">
                404
            </h1>
            <p className="text-center  text-xl">{err||"We couldn't find the page"}</p>

            <Link href={"/"}>
                <Button className="bg-white !text-blue-400 hover:bg-blue-300 transition-all duration-300">
                    Back to Home
                </Button>
            </Link>
        </div>
    )
}