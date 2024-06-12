import { SetStateAction } from "react";
import EditImages from "./editAssets/images/editImages";

interface Props {
    salon:{
        id:string;
        prices:string[];
        city:string;
        comments:number;
        holidays:boolean;
        images:string[];
        latitude:number;
        longitude:number;
        openDays:string[];
        phoneNumber:string;
        ratings: { 
            people: number, 
            rating: number }
        salonName:string;
        time:string[];
        userId:string;
        user:{
            id:string;
            phoneNumber:string;
            image:string|null;
            name:string
        }
    };
    userId:string;
    setSalon:React.Dispatch<SetStateAction<any>>
}

export default function SalonEdit({salon,userId,setSalon}:Props) {

    return (
        <div className="flex flex-col gap-5">
            {/**Change image name price time date location everything show when click arrow hide the one */}
            <EditImages 
            images={salon.images} 
            ids={
                {
                    userId:userId,
                    barberId:salon.id
                }
            }
            setSalon={setSalon}
            />
        </div>
    )
}