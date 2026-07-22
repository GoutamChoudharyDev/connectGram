import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="border-t border-zinc-800 bg-zinc-950">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-8 text-sm text-zinc-400 md:flex-row lg:px-8">
                {/* Copyright */}
                <p className="text-center md:text-left">
                    © {new Date().getFullYear()}{" "}
                    <span className="font-semibold text-white">ConnectGram</span>. All
                    rights reserved.
                </p>

                {/* Links */}
                <nav className="flex flex-wrap items-center justify-center gap-6">
                    <Link
                        to="/privacy-policy"
                        className="transition-colors duration-200 hover:text-blue-500"
                    >
                        Privacy Policy
                    </Link>

                    <Link
                        to="/terms-of-service"
                        className="transition-colors duration-200 hover:text-blue-500"
                    >
                        Terms of Service
                    </Link>

                    <Link
                        to="/help-center"
                        className="transition-colors duration-200 hover:text-blue-500"
                    >
                        Help Center
                    </Link>
                </nav>
            </div>
        </footer>
    )
}

export default Footer