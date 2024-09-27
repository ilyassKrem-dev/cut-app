import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { Slider } from "@mui/material";
import { Input } from "@/components/ui/input";
interface Props {
    enter:boolean;
    setEnter:React.Dispatch<SetStateAction<boolean>>;
    scrolling:boolean;
    price:string;
    setPrice:React.Dispatch<SetStateAction<string>>;
    priceString:string | null;
    showPrice:boolean,
    setShowPrice:React.Dispatch<SetStateAction<boolean>>
}

export default function Price(
    {enter,
        setEnter,
        scrolling,
        price,
        setPrice,
        priceString,
        showPrice,
        setShowPrice
        }
        :
        Props
    ) {
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => { 
        setPrice(filterNumber(e.target.value as any) as string)
      
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

    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".priceBg");
          if (overlay && !overlay.contains(event.target)) {
            
            setShowPrice(false);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, [setShowPrice]);

    let textP = price ? price : "Min Price"
    return (
        <div className="flex-1 priceBg">
            <div className={`pl-6  py-3 cursor-pointer hover:opacity-60 transition-all duration-300 ${!showPrice&&"hover:bg-gray-400/50"} rounded-full flex-1 group relative h-full flex flex-col gap-1 justify-center ${showPrice&&"bg-black"}`}
                onMouseEnter={() => setEnter(true)}
                onMouseLeave={() => setEnter(false)}
                onClick={() => setShowPrice(prev => !prev)}>
                    <div className={`flex  gap-1  border-gray-600 justify-between items-center
                    
                    `}>
                        <div className="flex flex-col gap-1">
                            <h4 className=" text-sm cursor-pointer">Price</h4>
                            {!scrolling?
                            <p className="text-gray-400 text-xs cursor-pointer capitalize">{textP}</p>
                            :
                            priceString?
                            <p className="text-gray-400 text-xs cursor-pointer capitalize">{textP}</p>
                            :
                            ""
                            }
                        </div>
                        {showPrice&&price&&
                        <div className="pr-6 text-lg  transition-all duration-300   rounded-full ">
                            <span className="hover:bg-white/50 hover:oapcity-60 rounded-full px-2 p-1 transition-all duration-300 text-white " onClick={() => setPrice("")}>x</span>
                            
                        </div>}
                    </div>
                    
            </div>
            {showPrice&&
            <div className={`absolute  top-20 bg-black shadow-[0px_0px_8px_2px_rgba(255,255,255,0.4)] rounded-xl  max-w-[392px] ${scrolling?"w-[300px]":"w-[392px]"} `}>
                <div className="flex flex-col gap-3 p-3">
                    <h1 className="">Search by min price</h1>
                    <div className="flex flex-col  justify-center gap-4">
                        <div className="relative w-full ">
                            <Input type="text" name="min" className="md:py-5 p-8 py-7 pl-4 pr-10 focus-visible:ring-0 focus-visible:border-dark focus-visible:border-2 bg-black border-white/20 focus-visible:ring-offset-white/50 text-white/80 w-full" value={price  || 0} onChange={(handleChange)}/>
                                <p className="font-semibold text-sm absolute right-3 bottom-5 text-white/50 md:bottom-3">Dh</p>
                        </div>
                        <div className="flex text-xs flex-col gap-2">
                            <div className="flex justify-between">
                                <p>0 Dh</p>
                                <p>500 Dh</p>
                            </div>
                            <input 
                            type="range" 
                            value={price || 0} 
                            onChange={(e) => 
                            setPrice(e.target.value)} 
                            min={0} 
                            max={500} 
                            step={1} 
                            className="w-full bg-white accent-white/20" />
                        </div>
                        
                    </div>
                    

                </div>
            </div>}
        </div >
    )
}