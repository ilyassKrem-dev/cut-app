import { Button } from "@/components/ui/button";
import { SetStateAction, use, useState } from "react";
import LoadingAnimation from "@/assets/other/spinner";
import { useToast } from "@/components/ui/use-toast";
import { ChangeSalonPrefer } from "@/lib/actions/barber.action.edit";
interface Props {
    ids:{
        userId:string;
        barberId:string
    };
    newPreferences:{
        prices:number[],
        dates:string[],
        time:string[],
        holiday:boolean
    }
    setSalon:React.Dispatch<SetStateAction<any>>;
    check:boolean
}

export default function SavePref(
    {
        ids,
        newPreferences,
        setSalon,
        check
    }:Props
) {
    const [loading,setLoading] = useState<boolean>(false)
    const {toast} = useToast()
    console.log(newPreferences.time)
    const handleSave = async() => {
        if(loading||check) return
        try {
            setLoading(true)
            
            const res = await ChangeSalonPrefer(
                {
                    userId:ids.userId,
                    barberId:ids.barberId,
                    preferences:newPreferences
                }
            )
            if(res) {
                toast({
                    variant:"success",
                    title:"Saved",
                    description:"You preferences has been changed"       })
                setSalon((prev:any) => {
                    return {
                        ...prev,
                        openDays:res.openDays,
                        time:res.time,
                        Prices:res.Prices,
                        holidays:res.holidays
                    }
                })
                setLoading(false)
            }
        } catch (error:any) {
            setLoading(false)
            toast({
                variant:"destructive",
                title:"Error",
                description:error.message            })
        }
    }

    return (
        <div className="self-end">
            <Button className="bg-green-1 hover:bg-green-1/60 active:bg-green-1/40 transition-all duration-300 w-[150px]" disabled={loading || check} onClick={handleSave}>
                {loading ?<LoadingAnimation /> :"Save"}
            </Button>
        </div>
    )
}