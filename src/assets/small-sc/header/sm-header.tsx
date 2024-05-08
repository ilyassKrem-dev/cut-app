"use client"

import { FaFilter } from "react-icons/fa";
import { useState } from "react";
import { Suspense } from "react";
import Filters from "../../header-assets/filters";
import SmSearchBar from "./misc/searchBar/sm-searchBar";
export default function SmMainHeader() {
    const [show,setShow] = useState<boolean>(false)
    const [numFilters,setNumFilters] = useState(0)

    return (
        <>
            <div className="p-4  bg-black border-b border-white/20 md:hidden">
                <div className="flex flex-col gap-5" >
                    <div className="flex gap-2 items-center" id="searchBar">
                        <Suspense>
                            <SmSearchBar />
                        </Suspense>
                        <div className="border-2 rounded-full p-2 border-white/50 relative cursor-pointer hover:opacity-60 transition-all duration-300 " onClick={() => setShow(true)}>
                            <Suspense>
                                <FaFilter className="text-xl text-white/80"/>
                            </Suspense>
                            {numFilters!==0&&<div className="absolute -top-2 -right-1 text-black rounded-full text-xs px-1 border  bg-white">
                                {numFilters} 
                            </div>}
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