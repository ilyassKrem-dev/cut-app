

import { Input } from "@/components/ui/input"
import { ChangeEvent, SetStateAction, useState } from "react"

export default function PriceFilter({priceFilter,setPriceFilter}:{
    priceFilter:{
        min:string;
        max:string;
    }
    setPriceFilter:React.Dispatch<SetStateAction<{
        min:string;
        max:string;
    }>>
}) {

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name,value} =  e.target
        
        setPriceFilter(prev => {
            return {...prev,[name]:(filterNumber(value))}
        })
    }
    function filterNumber(num: string): string | number {
        let decimalPointCount = 0;
    
        const filteredNum = num ? num.split("").filter((char: string) => {
            if (char === ".") {
                if (decimalPointCount === 0) {
                    decimalPointCount++;
                    return true;
                } else {
                    return false;
                }
            }
            return (/(\d)/).test(char);
        }).join("") : "";
    
        return filteredNum || "";
    }
    
    return (
        <div className="p-4 flex flex-col gap-5 bg-black/50 rounded-xl mx-3">
            <div className="flex flex-col px-2">
                <h1 className="font-bold text-lg">Price</h1>
                <p className="text-sm text-gray-500">Filter by price</p>
            </div>
            <div className="flex gap-2 items-center justify-center px-2">
                <div className="w-full relative">
                    <p className="text-sm absolute top-2 left-4 font-semibold ">Minimum</p>
                    <Input type="text" name="min" className=" h-16 pt-8 pb-3 pl-4 pr-10 focus-visible:ring-0 focus-visible:border-dark focus-visible:border-2 bg-black border-white/20 focus-visible:ring-offset-white/50 text-white/80" value={priceFilter.min} onChange={handleChange}/>
                    <p className="font-semibold text-sm absolute right-3 bottom-2 text-white/50">Dh</p>
                </div>
                <p className="text-xl">&#9135;&#9135;</p>
                <div className="w-full relative">
                    <p className="text-sm absolute top-2 left-4 font-semibold text-white">Maximum</p>
                    <Input type="text" name="max" className=" h-16 pt-8 pb-3 pl-4 pr-10 focus-visible:ring-0 focus-visible:border-dark focus-visible:border-2 bg-black border-white/20 focus-visible:ring-offset-white/50 text-white/80" value={priceFilter.max} onChange={handleChange}/>
                    <p className="font-semibold text-sm absolute right-3 bottom-2 text-white/50">Dh</p>
                </div>
            </div>
        </div>
    )
}