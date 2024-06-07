
import ForgetTemplate from "@/assets/forget/forget-template"
import { Suspense } from "react"

export default function Page() {

    return (
        <div className="h-screen">
            
                <Suspense>
                    <ForgetTemplate />
                </Suspense>
        </div>
    )
    
}