import  { SetStateAction, useEffect, useState } from "react";

import SearchCities from "@/assets/other/searchCities";
interface Props {
    enter:boolean;
    setEnter:React.Dispatch<SetStateAction<boolean>>;
    scrolling:boolean;
    city:string;
    setCity:React.Dispatch<SetStateAction<string>>;
    cityString:string | null;
    showLocation:boolean,
    setShowLocation:React.Dispatch<SetStateAction<boolean>>
}
export default function Location(
    {enter,
    setEnter,
    scrolling,
    city,
    setCity,
    cityString,
    showLocation,
    setShowLocation
    }
    :
    Props) {
    const [userInput,setUserInput] = useState<string>("")
    
    const handleClick = (city:string) => {
        setCity(city)
        setShowLocation(false)
    }
    useEffect(() => {
        if(city) return
        setCity(cityString as string)
    },[])
    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".locationBg");
          if (overlay && !overlay.contains(event.target)) {
            
            setShowLocation(false);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    
    let textP = city ? city : "Search location"
    
    return (
        <div className="flex-1 locationBg">
            <div className={`pl-6  py-3 cursor-pointer hover:opacity-60 transition-all duration-300 ${!showLocation&&"hover:bg-gray-400/50"} rounded-full flex-1 group relative h-full flex flex-col gap-1 justify-center ${showLocation&&"bg-black"}`}
                onMouseEnter={() => setEnter(true)}
                onMouseLeave={() => setEnter(false)}
                onClick={() => setShowLocation(prev => !prev)}>
                    <div className={`flex  gap-1 border-r border-gray-600 justify-between items-center
                    ${enter ? "border-r-0":showLocation?"border-r-0":""} 
                    `}>
                        <div className="flex flex-col gap-1">
                            <h4 className=" text-sm cursor-pointer">Location</h4>
                            {!scrolling?
                            <p className="text-gray-400 text-xs cursor-pointer capitalize">{textP}</p>
                            :
                            cityString?
                            <p className="text-gray-400 text-xs cursor-pointer capitalize">{textP}</p>
                            :
                            ""
                            }
                        </div>
                        {showLocation&&city&&
                        <div className="pr-6 text-lg  transition-all duration-300   rounded-full ">
                            <span className="hover:bg-white/50 hover:oapcity-60 rounded-full px-2 p-1 transition-all duration-300 text-white " onClick={() => setCity("")}>x</span>
                            
                        </div>}
                    </div>
                    
            </div>
            {showLocation&&
            <div className={`absolute  top-20 bg-black shadow-[0px_0px_8px_2px_rgba(255,255,255,0.4)] rounded-xl  max-w-[392px] ${scrolling?"w-[300px]":"w-[392px]"} `}>
                <div className="flex flex-col gap-3 p-3">
                    <h1 className="">Search by city</h1>
                    
                    <SearchCities
                    name="bg-searchcity"
                    setUserInput={setUserInput}
                    handleClick={handleClick}
                    userInput={userInput} />

                </div>
            </div>}
        </div >
    )
}