import HeroSection from "../components/HeroSection";
import VerifyEmailForm from "../components/VerifyEmailForm";
import AuthLayout from "../layout/AuthLayout";

const VerifyEmailPage = () => {
  return (
    <AuthLayout>
      <div className="mx-auto grid min-h-[calc(100vh-120px)] max-w-7xl grid-cols-1 lg:grid-cols-12">
        {/* Hero Section */}
        <div className="hidden lg:col-span-5 lg:flex lg:items-center lg:justify-center">
          <HeroSection
            heading={
              <>
                <span className="block">Verify</span>
                <span className="block text-blue-600">
                  Your Email.
                </span>
              </>
            }
            description="We've sent a verification code to your email. Enter the code below to activate your ConnectGram account and start connecting."
          />
        </div>

        {/* Verify Email Form */}
        <div className="flex items-center justify-center lg:col-span-7">
          <VerifyEmailForm />
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmailPage;