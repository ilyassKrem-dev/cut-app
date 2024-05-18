import { Input } from "@/components/ui/input";
import { SetStateAction } from "react"
import cities from "@/assets/other/ma.json"

export default function SearchCities({setUserInput,handleClick,userInput,classNameInput,classNameResult,name}:{
    setUserInput:React.Dispatch<SetStateAction<string>>;
    handleClick:(arb:string) => void 
    userInput:string;
    classNameInput?:string;
    classNameResult?:string;
    name:string
}) {

    let maCities = userInput.length !==0 ? cities.filter(city => city.city.toLowerCase().startsWith(userInput)) : []

    return (
        <div className="flex-wrap  gap-2 flex  items-center">
            <Input id={name} type="text" value={userInput} placeholder="City" onChange={(e) => setUserInput(e.target.value)} className={`bg-dark text-white focus-visible:ring-offset-white/20 border-0  ${classNameInput}`}/>
            {maCities.length !==0&&<div className={`p-2 flex flex-col gap-2 w-full ${classNameResult}`}>
                {maCities.slice(0,5).map((city:any,index:number) => {
                    return (
                        <div key={index} className=" cursor-pointer hover:opacity-40 hover:bg-white/50 w-full p-1 rounded-xl" onClick={() => handleClick(city.city)}>
                            {city.city}
                        </div>
                    )
                })}
            </div>}
        </div>
    )
}