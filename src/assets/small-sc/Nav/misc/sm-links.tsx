"use client"

import Link from "next/link"
import { icons } from "./sm-icons"
import Media from "react-media"


export default function SmMainLinks() {
    
    return (
        <Media query={"(max-width:767px)"} render={() => {
            return (
                <nav className="fixed bottom-0 left-0 right-0 bg-black z-40 md:hidden shadow-[0px_0px_6px_2px_rgba(255,255,255,0.2)]">
                    <div className="p-3 flex justify-center items-center gap-10 sm:gap-14">
                        {icons.map(icon => {
                            return (
                                <Link href={icon.path} key={icon.name} className="flex flex-col items-center gap-2  hover:text-accent hover:opacity-80 transition-all duration-300">
                                    <div className="text-2xl sm:text-3xl">
                                        {icon.icon}
                                    </div>
                                    <p className="text-xs cursor-pointer sm:text-sm">{icon.name}</p>
                                </Link>
                            )
                        })}
                    </div>
                </nav>
            )
        }} />
            
       
    )
}