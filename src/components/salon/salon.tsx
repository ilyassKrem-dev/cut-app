import { IoMdCut } from "react-icons/io";
import { Button } from "../ui/button";
import Link from "next/link";
interface Props {
    userId:string | undefined
}

export default  function Salon({userId}:Props) {
    const salon = {}
    return (
        <div>
            {salon
            ?
            <div className=" flex items-center flex-col h-screen  md:py-0 justify-center gap-20">
                <div className="flex flex-col gap-4 items-center justify-center">
                    <div className="rounded-full border-2 border-dashed p-3 border-spacing-16">
                        <IoMdCut className="text-5xl -rotate-90"/>
                        
                    </div>
                    <h4 className="text-xl">Set up your salon</h4>
                </div>
                <div className="flex gap-4 flex-col item">
                    <div className="flex gap-2 items-center  border-b pb-4">
                        <p className="text-gray-400">Start by clicking <span className="text-green-1">Set up</span> button below</p>
                        
                    </div>
                    <Link href={`/salon/setup?fiId=${userId}`} className="w-full">
                        <Button className="bg-green-1 hover:bg-green-1/60 hover:opacity-60 transition-all duration-300 w-full">Set up</Button>
                    </Link>

                </div>

            </div>
            :
            ""}
        </div>
    )
} 