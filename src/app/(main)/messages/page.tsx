"use client"

import LoadingAnimation from "@/assets/other/spinner";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
const MessagesHome = dynamic(() => import("@/components/messages/assets/messagesHome"), { ssr: false,loading:() => {
    return (
        <div className=" flex justify-center items-center flex-col gap-2 w-full">
                <LoadingAnimation containerClassName="!h-[500px]"/>
                <div className="flex flex-col gap-1 flex-1 h-full">
                    <p className="text-xs text-center">if loading take to mush reload</p>
                    <Button  onClick={() => window.location.href = `/messages`}>
                            reload
                    </Button>

                </div>
        </div>
    )
} });

export default function Page() {

    return (
        <MessagesHome />
    )
}