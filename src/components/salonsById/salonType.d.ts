




export type SalonType = {
    id:string;
    userId:string;
    address:string;
    city:string;
    latitude: number;
    longitude: number;
    time: string[];
    openDays:string[];
    holidays: boolean |null;
    Prices: number[];
    phoneNumber: string | null;
    images: string[];
    salonName: string;
    ratings: { 
        people: number, 
        rating: number }
    user:{
        name:string;
        image:string | null;
        phoneNumber:string | null
    },
    comments:CommentsType[]

}
export type CommentsType = {
    id:string;
    stars:number;
    comment:string;
    user:{
        id:string;
        name:string;
        
        image:string
    }
}
export type SalonCommentsType = {
    id:string;
    images: string[];
    salonName: string;
    comments:CommentsType[]
}
export type UserCommentType = {
    comment:string,
    rating:number
}