import HeroSection from "../components/HeroSection";
import RegisterForm from "../components/RegisterForm";
import AuthLayout from "../layout/AuthLayout";

const RegisterPage = () => {
    return (
        <AuthLayout>
            <div className="mx-auto grid min-h-[calc(100vh-120px)] max-w-7xl grid-cols-1 lg:grid-cols-12">
                {/* Left Section */}
                <div className="hidden lg:col-span-5 lg:flex lg:items-center lg:justify-center">
                    <HeroSection />
                </div>

                {/* Right Section */}
                <div className="flex items-center justify-center lg:col-span-7">
                    <RegisterForm />
                </div>
            </div>
        </AuthLayout>
    );
};

export default RegisterPage;