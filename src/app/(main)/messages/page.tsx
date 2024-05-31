"use client"

import LoadingAnimation from "@/assets/other/spinner";
import dynamic from "next/dynamic";
const MessagesHome = dynamic(() => import("@/components/messages/assets/messagesHome"), { ssr: false,loading:() => {
    return (
        <div className=" justify-center items-center w-full flex-col hidden md:flex" >
                <LoadingAnimation />
        </div>
    )
} });

export default function Page() {

    return (
        <MessagesHome />
    )
}