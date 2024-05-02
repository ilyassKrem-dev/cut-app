
import Logo from "../../Logo/logo"

export default function BiMainNav() {

    return (
        <header className="hidden md:flex  bg-black  shadow-sm p-6">
            <div className="flex justify-between items-center">
                <Logo />
            </div>
        </header>
    )
}