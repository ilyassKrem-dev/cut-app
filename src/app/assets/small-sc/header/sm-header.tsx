"use client"
import { IoSearchOutline } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { useState } from "react";
import Filters from "../../header-assets/filters";
export default function SmMainHeader() {
    const [show,setShow] = useState<boolean>(false)
    const [numFilters,setNumFilters] = useState(0)
    return (
        <>
            <div className="p-4  bg-black border-b border-white/20 md:hidden">
                <div className="flex flex-col gap-5" >
                    <div className="flex gap-2 items-center" id="searchBar">
                        <div className="bg-light rounded-full p-1 text-dark px-4 shadow-[0px_2px_2px_0px_rgba(255,255,255,1)] cursor-pointer flex-1 hover:opacity-65 transition-all duration-300">
                            <div className="flex gap-6 items-center">
                                <IoSearchOutline className="text-2xl"/>
                                <div className="flex flex-col text-sm gap-1">
                                    <h2 className="font-bold cursor-pointer">Loaction</h2>
                                    <p className="text-xs text-gray-1 cursor-pointer">Aga</p>
                                </div>
                            </div>
                        </div>
                        <div className="border-2 rounded-full p-2 border-white relative cursor-pointer hover:opacity-60 transition-all duration-300" onClick={() => setShow(true)}>
                            <FaFilter className="text-xl"/>
                            <div className="absolute -top-2 -right-1 bg-light text-black rounded-full text-xs px-1 border border-black">
                                {numFilters!==0&&numFilters} 
                            </div>
                        </div>
                    </div>
        
                </div>
            </div>
            {show&&
            <Filters 
            setShow={setShow} 
            setNumFilters={setNumFilters}/>}
        </>
    )
}