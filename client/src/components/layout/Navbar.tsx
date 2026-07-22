import { Orbit } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <header className="fixed top-0 left-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-3 transition-opacity hover:opacity-90"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10">
                        <Orbit className="h-7 w-7 text-blue-500" />
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        ConnectGram
                    </h1>
                </Link>

                {/* Right Side (Reserved for future) */}
                <div className="flex items-center gap-4">
                    {/* Future:
              Theme Toggle
              Login Button
              Notifications
              User Avatar
          */}
                </div>
            </div>
        </header>
    )
}

export default Navbar