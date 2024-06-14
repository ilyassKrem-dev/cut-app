import { SetStateAction } from "react";
import EditImages from "./editAssets/images/editImages";
import EditInfo from "./editAssets/info/Editinfo";
import EditLocation from "./editAssets/location/editLocation";
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
        address:string;
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
            <div className="flex flex-col gap-4 lg:flex-row max-w-[1500px] 2xl:mx-auto">
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
                <EditInfo 
                info={{
                    salonName:salon.salonName,
                    phoneNumber:salon.phoneNumber
                }}
                ids={
                    {
                        userId:userId,
                        barberId:salon.id
                    }
                }
                setSalon={setSalon}
                />
            </div>
            <div>
                <div className="flex flex-col gap-4 lg:flex-row max-w-[1500px] 2xl:mx-auto">
                    <EditLocation
                    location={
                        {
                            city:salon.city,
                            coord:{
                                latitude:salon.latitude,
                                longitude:salon.longitude
                            },
                            address:salon.address
                        }
                    } 
                    ids={
                        {
                            userId:userId,
                            barberId:salon.id
                        }
                    }
                    setSalon={setSalon}
                    />
                    <EditLocation
                    location={
                        {
                            city:salon.city,
                            coord:{
                                latitude:salon.latitude,
                                longitude:salon.longitude
                            },
                            address:salon.address
                        }
                    } 
                    ids={
                        {
                            userId:userId,
                            barberId:salon.id
                        }
                    }
                    setSalon={setSalon}
                    />
                </div>
                
            </div>
            {/**Change image name price time date location everything show when click arrow hide the one */}
        </div>
    )
}