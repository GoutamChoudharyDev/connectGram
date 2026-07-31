import type { ReactNode } from "react";
import MobileBottomNav from "./MobileBottomNav";
import MobileNavbar from "./MobileNavbar";
import Navbar from "./Navbar";
import RightSidebar from "./RightSidebar";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
    children: ReactNode;
    fullWidth?: boolean;
}

const MainLayout = ({ children, fullWidth = false }: MainLayoutProps) => {
    return (
        <div className="min-h-[100dvh] bg-black text-white">
            {/* Desktop Sidebar */}
            <Sidebar />

            <div className="lg:ml-64">
                {/* Desktop Navbar */}
                <div className="hidden lg:block">
                    <Navbar />
                </div>

                {/* Mobile Navbar */}
                <MobileNavbar />

                <div className="mx-auto flex max-w-7xl">
                    {/* Main Content */}
                    <main
                        className={`flex-1 px-3 pt-4 sm:px-4 sm:pt-6 lg:px-6 lg:pt-24 
                            ${fullWidth ? "pb-0" : "pb-24 lg:pb-6"}`
                        }
                    >
                        <div className={fullWidth ? "w-full" : "mx-auto max-w-2xl"}>
                            {children}
                        </div>
                    </main>

                    {/* Desktop Right Sidebar */}
                    <RightSidebar />
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <MobileBottomNav />
        </div>
    );
};

export default MainLayout;