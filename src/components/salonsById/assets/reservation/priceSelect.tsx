import { Input } from "@/components/ui/input";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react"
import { Slider } from "@mui/material";



export default function PriceSelect({barberPrices,selectedPrice,setSelectedPrice}:{
    barberPrices:number[];
    selectedPrice:number;
    setSelectedPrice:React.Dispatch<SetStateAction<number>>
}) {
    const [windowSize,setWindowSize] = useState<number>(window.innerWidth)
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => { 
        setSelectedPrice(Number(filterNumber(e.target.value as any)))
      
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
        const changedWidth = () => {
            setWindowSize(window.innerWidth)
        }
        window.addEventListener("resize",changedWidth)

        return () => window.removeEventListener("resize",changedWidth)
        
    },[windowSize])
    const handleChangePrice = (event: Event, value: number | number[]) => {
        setSelectedPrice(Number(value))
    }
    return (
        <>
            <div className="flex flex-col  justify-center gap-4">
                <div className="relative w-[40%] mx-auto">
                    <Input type="text" name="min" className="md:py-5 p-8 py-7 pl-4 pr-10 focus-visible:ring-0 focus-visible:border-dark focus-visible:border-2 bg-black border-white/20 focus-visible:ring-offset-white/50 text-white/80" value={selectedPrice} onChange={(handleChange)}/>
                        <p className="font-semibold text-sm absolute right-3 bottom-5 text-white/50 md:bottom-3">Dh</p>
                </div>
                <div className="w-[80%] mx-auto flex gap-4 items-center justify-center">
                    <p  className="text-sm text-white/40 flex gap-1">{barberPrices[0]} Dh</p>
                    <Slider
                        className="max-w-[60%]"
                        defaultValue={barberPrices[0]}
                        getAriaValueText={valuetext}
                        step={1}
                        onChange={handleChangePrice}
                        value={selectedPrice}
                        min={barberPrices[0]}
                        max={barberPrices[1]}
                        sx={{
                            "& .MuiSlider-rail":{
                                backgroundColor:"rgba(255,255,255,0.4)"
                            },
                            "& .MuiSlider-track":{
                                backgroundColor:"rgba(255,255,255,1)",
                                color:"rgba(255,255,255,1)"
                            },
                            "& .MuiSlider-thumb":{
                                backgroundColor:"rgba(255,255,255,1)"
                            },
                            
                        }}
                        
                    />
                    <p  className="text-sm text-white/40 flex gap-1">{barberPrices[1]} Dh</p>
                </div>
            </div>
        </>
    )
}

function valuetext(value: number) {
    return `${value}`;
}