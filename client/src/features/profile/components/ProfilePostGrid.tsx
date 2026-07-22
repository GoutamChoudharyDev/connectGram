import ProfilePostCard from "./ProfilePostCard";

const ProfilePostGrid = () => {
    return (
        <div className="mt-6 grid grid-cols-3 gap-1">
            <ProfilePostCard />
            <ProfilePostCard />
            <ProfilePostCard />
            <ProfilePostCard />
            <ProfilePostCard />
            <ProfilePostCard />
            <ProfilePostCard />
            <ProfilePostCard />
            <ProfilePostCard />
        </div>
    );
};

export default ProfilePostGrid;