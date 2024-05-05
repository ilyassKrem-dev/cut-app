"use client"
import EmailForm from "@/components/forms/emailForm"
import { useState } from "react"

export default function FormulaLogin() {
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    
    const [next,setNext] = useState<boolean>(false)
    
    return (
        <>
            {!next&&<div>
                <EmailForm email={email} setEmail={setEmail} setNext={setNext}/>
            </div>}
            <div>

            </div>
        </>
    )
}