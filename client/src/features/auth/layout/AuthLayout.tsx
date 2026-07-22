import type { ReactNode } from "react";
import Footer from "../../../components/layout/Footer";
import Navbar from "../../../components/layout/Navbar";

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
            <Navbar />

            <main className="flex-1 pt-20">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default AuthLayout;