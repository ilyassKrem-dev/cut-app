

export type BarberType = {
    id:string;
    salonName:string;
    images:string;
    address:string;
    city:string;
    latitude:number;
    longitude:number
}

export type ReservesType = {
    id:string;
    date:string;
    price:number;
    time:number;
    createdAt:any;
    userId:string;
    barber:BarberType
}

