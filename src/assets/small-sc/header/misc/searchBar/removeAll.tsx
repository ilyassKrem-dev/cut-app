
import { useSearchParams,useRouter} from "next/navigation"
import { SetStateAction } from "react"
interface Props {
    setCity:React.Dispatch<SetStateAction<string>>
    setUserInput:React.Dispatch<SetStateAction<string>>
}
export default function RemoveAll({setCity,setUserInput}:Props) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const handleRemove = () => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        setCity("")
        setUserInput('')
        current.delete('city')
        router.push(`/?${current.toString()}`)
    }
    return (
        <div className="text-lg">
            <p className="underline cursor-pointer hover:opacity-60 transition-all duration-300" onClick={handleRemove}>Remove all</p>
        </div>
    )
}