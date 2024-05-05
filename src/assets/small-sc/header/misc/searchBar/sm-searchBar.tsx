import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import SearchOverlay from "./search-overlay";
import { useSearchParams } from "next/navigation";
export default function SmSearchBar() {
    const [show,setShow] = useState<boolean>(false)
    const cityString = useSearchParams().get('city')
    return (
        <>
            <div className="bg-black rounded-full p-1 text-white px-4 shadow-[0px_0px_4px_1px_rgba(255,255,255,0.4)] cursor-pointer flex-1 hover:opacity-65 transition-all duration-300" onClick={() => setShow(true)}>
                <div className="flex gap-6 items-center">
                    <IoSearchOutline className="text-2xl"/>
                    <div className="flex flex-col text-sm gap-1">
                        <h2 className="font-bold cursor-pointer">Loaction</h2>
                        <p className="text-xs text-gray-1 cursor-pointer capitalize">{cityString ? cityString :"Search"}</p>
                    </div>
                </div>
            </div>
            {show&&
            <SearchOverlay setShow={setShow} show={show}/>}
        </>
    )
}