
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NoPermission() {

    return (
        <div className="md:h-screen flex justify-center items-center py-36 md:py-0">
            <div className="flex flex-col items-center gap-8">
                <h1 className="text-center font-bold max-w-[260px] md:max-w-full">You dont have the permissions to enter this page
                </h1>
                <Link href={"/"}>
                    <Button className="w-[200px]">
                        Home
                    </Button>
                </Link>
            </div>
        </div>
    )
}