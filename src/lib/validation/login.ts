import * as z from "zod"

export const loginValidation = z.object({
    email:z.string().email({message:"Invlid email"}).min(1,{message:"Email is required"}),
    password:z.string().min(6,{message:"Password must be more than 6 characters"})
})