import MainLayout from "../../../components/layout/MainLayout";
import Feed from "../components/Feed";
import Stories from "../components/Stories";

const HomePage = () => {
    return (
        <MainLayout>
            <div className="mx-auto w-full max-w-full space-y-4 sm:max-w-2xl lg:max-w-3xl">
                <Stories />
                <Feed />
            </div>
        </MainLayout>
    );
};

export default HomePage;