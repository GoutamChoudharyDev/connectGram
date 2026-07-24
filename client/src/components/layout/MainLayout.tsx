import type { ReactNode } from "react";
import MobileBottomNav from "./MobileBottomNav";
import MobileNavbar from "./MobileNavbar";
import Navbar from "./Navbar";
import RightSidebar from "./RightSidebar";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="min-h-screen bg-black text-white">
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
                    {/* Feed */}
                    <main className="flex-1 px-4 py-6 pb-24 lg:pb-6">
                        <div className="mx-auto max-w-2xl">
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