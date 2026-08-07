import { Orbit } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8 xl:px-10">
                {/* Logo */}
                <Link
                    to="/home-page"
                    className="flex items-center gap-3 transition-opacity hover:opacity-90"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10">
                        <Orbit className="h-7 w-7 text-blue-500" />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-white xl:text-3xl">
                        ConnectGram
                    </h1>
                </Link>
            </div>
        </header>
    );
}

export default Navbar