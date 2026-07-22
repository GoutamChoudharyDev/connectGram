import HeroSection from "../components/HeroSection";
import LoginForm from "../components/LoginForm";
import AuthLayout from "../layout/AuthLayout";

const LoginPage = () => {
    return (
        <AuthLayout>
            <div className="mx-auto grid min-h-[calc(100vh-120px)] max-w-7xl grid-cols-1 lg:grid-cols-12">
                {/* Hero Section */}
                <div className="hidden lg:col-span-5 lg:flex lg:items-center lg:justify-center">
                    <HeroSection
                        heading={
                            <>
                                <span className="block">Welcome</span>
                                <span className="block text-blue-600">
                                    Back.
                                </span>
                                <span className="block">Stay</span>
                                <span className="block text-blue-600">
                                    Connected.
                                </span>
                            </>
                        }
                        description="Sign in to reconnect with your friends, discover new moments, and continue your ConnectGram journey."
                    />
                </div>

                {/* Login Form */}
                <div className="flex items-center justify-center lg:col-span-7">
                    <LoginForm />
                </div>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;