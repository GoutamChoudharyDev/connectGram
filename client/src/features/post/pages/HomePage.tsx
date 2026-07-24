import MainLayout from "../../../components/layout/MainLayout";
import Feed from "../components/Feed";
import Stories from "../components/Stories";

const HomePage = () => {
    return (
        <MainLayout>
            <div className="mx-auto w-full max-w-xl">
                <Stories />
                <Feed />
            </div>
        </MainLayout>
    );
};

export default HomePage;