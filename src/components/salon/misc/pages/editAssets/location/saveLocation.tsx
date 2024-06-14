import { Button } from "@/components/ui/button";
import { SetStateAction, use, useState } from "react";
import LoadingAnimation from "@/assets/other/spinner";
import { useToast } from "@/components/ui/use-toast";
import { changeSalonLocation } from "@/lib/actions/barber.action.edit";
interface Props {
    ids:{
        userId:string;
        barberId:string
    };
    newLocation:{
        city:string;
        mapLocation:{
            latitude:number,
            longitude:number
        },
        address:string
    }
    setSalon:React.Dispatch<SetStateAction<any>>;
    check:boolean
}

export default function SaveLocation(
    {
        ids,
        newLocation,
        setSalon,
        check
    }:Props
) {
    const [loading,setLoading] = useState<boolean>(false)
    const {toast} = useToast()
    const handleSave = async() => {
        if(loading||check) return
        try {
            setLoading(true)
            const res = await changeSalonLocation(
                {
                    userId:ids.userId,
                    barberId:ids.barberId,
                    location:newLocation
                }
            )
            if(res) {
                toast({
                    variant:"success",
                    title:"Saved",
                    description:"You location has been changed"       })
                setSalon((prev:any) => {
                    return {
                        ...prev,city:res.city,
                        address:res.address,
                        latitude:res.latitude,
                        longitude:res.longitude
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