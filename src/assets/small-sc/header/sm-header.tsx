"use client"

import { FaFilter } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import Filters from "@/assets/header-assets/filters";
import SmSearchBar from "./misc/searchBar/sm-searchBar";
import { useSearchParams } from "next/navigation";
export default function SmMainHeader() {
    const [show,setShow] = useState<boolean>(false)
    const [numFilters,setNumFilters] = useState(0)
    const searchParams = useSearchParams()
    useEffect(() => {
        setNumFilters(getFiltersNums(searchParams))
    },[searchParams])
    return (
        <>
            <div className="p-4  bg-black border-b border-white/20 md:hidden fixed top-0 right-0 left-0 z-50">
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

function getFiltersNums(searchParams:any) {
    
    let num = 0
    if(searchParams.get("ratings") != null&&searchParams.get("rating")!=="null")  {
        num++
    }
    if(searchParams.get("equ") != null&&searchParams.get("equ") !== "null") {
        num++
    }
    if(searchParams.get("min") != null&&searchParams.get("min") !== "0") {
        num++
    }
    if(searchParams.get("max") != null&&searchParams.get("max") !== "0") {
        num++
    }
    return num
}