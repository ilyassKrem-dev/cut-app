

import Image from "next/image"

export default function ProfileIcon() {


    return (
        <div className="bg-white rounded-full p-[0.4rem] px-3 flex gap-4 items-center cursor-pointer hover:opacity-80 transition-all duration-300">
            <div className="flex flex-col gap-[0.1rem]">
                <div className="h-1 w-5 bg-dark rounded-full" />
                <div className="h-1 w-5 bg-dark rounded-full" />
                <div className="h-1 w-5 bg-dark rounded-full" />
            </div>
            <Image 
            src={"/profile.jpg"} 
            alt="profile image"
            width={30}
            height={30}
            className="rounded-full w-[30px] h-[30px] bg-white" />

        </div>
    )
}