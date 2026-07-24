import MainLayout from "../../../components/layout/MainLayout";
import MediaUploader from "../components/MediaUploader";
import PostDetailsForm from "../components/PostDetailsForm";
import PublishButton from "../components/PublishButton";
import { useState } from "react";

const CreatePostPage = () => {
    // usestate
    const [formData, setFormData] = useState({
        caption: "",
        location: ""
    });

    return (
        <MainLayout>
            <div className="mx-auto max-w-7xl px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        Create Post
                    </h1>
                    <p className="mt-2 text-zinc-400">
                        Share photos and videos with your followers.
                    </p>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
                    {/* Media Upload */}
                    <div className="lg:col-span-3">
                        <MediaUploader />
                    </div>

                    {/* Post Details */}
                    <div className="flex flex-col gap-6 lg:col-span-2">
                        <PostDetailsForm
                            formData={formData}
                            setFormData={setFormData}
                        />
                        <PublishButton />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default CreatePostPage;