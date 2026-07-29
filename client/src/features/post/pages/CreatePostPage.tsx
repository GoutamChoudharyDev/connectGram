import MainLayout from "../../../components/layout/MainLayout";
import MediaUploader from "../components/MediaUploader";
import PostDetailsForm from "../components/PostDetailsForm";
import PublishButton from "../components/PublishButton";
import { useState } from "react";
import { createPostApi } from "../services/post.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
    // usestate
    const [formData, setFormData] = useState({
        caption: "",
        location: ""
    });
    const [files, setFiles] = useState<File[]>([]);

    // navigate
    const navigate = useNavigate();

    // handle create post 
    const handleCreatePost = async () => {
        // validation
        if (files.length === 0) {
            toast.error("Please select atleast one image or video.");
            return;
        }

        try {
            const data = new FormData();

            // Append all media files
            files.forEach((file) => {
                data.append("media", file);
            });

            // Append other fields
            data.append("caption", formData.caption)
            data.append("location", formData.location)

            // Api Call
            const response = await createPostApi(data);
            toast.success(response.message);

            // reset form
            setFiles([]);

            setFormData({
                caption: "",
                location: ""
            });

            // navigate
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

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
                        <MediaUploader
                            files={files}
                            setFiles={setFiles}
                        />
                    </div>

                    {/* Post Details */}
                    <div className="flex flex-col gap-6 lg:col-span-2">
                        <PostDetailsForm
                            formData={formData}
                            setFormData={setFormData}
                        />
                        <PublishButton onClick={handleCreatePost} />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default CreatePostPage;