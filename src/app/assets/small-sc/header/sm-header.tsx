"use client"
import { IoSearchOutline } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import Media from "react-media";
export default function SmMainHeader() {

    return (
        <Media query={"(max-width:767px)"} render={() => {
            return (
                <div className="p-4 pb-0 bg-dark border-b border-white/10">
                    <div className="flex flex-col gap-5" >
                        <div className="flex gap-2 items-center" id="searchBar">
                            <div className="bg-light rounded-full p-2 text-dark px-4 shadow-[0px_2px_2px_0px_rgba(255,255,255,1)] cursor-pointer flex-1 hover:opacity-65 transition-all duration-300">
                                <div className="flex gap-6 items-center">
                                    <IoSearchOutline className="text-2xl"/>
                                    <div className="flex flex-col text-sm gap-1">
                                        <h2 className="font-bold cursor-pointer">Loaction</h2>
                                        <p className="text-xs text-gray-1 cursor-pointer">Aga</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border-2 rounded-full p-3 border-white relative cursor-pointer hover:opacity-60 transition-all duration-300">
                                <FaFilter className="text-xl"/>
                                <div className="absolute -top-1 -right-1 bg-light text-black rounded-full text-xs px-1 border border-black">
                                    2  
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="w-fit border-b-2 border-white">
                                All
                            </div>
                        </div>
                    </div>
                </div>
            )
        }} />
        
    )
}