import { useEffect, useState } from "react";
import MainLayout from "../../../components/layout/MainLayout";
import PostDetailsForm from "../components/PostDetailsForm";
import PublishButton from "../components/PublishButton";
import { useNavigate, useParams } from "react-router-dom";
import { getPostApi, updatePostApi } from "../services/post.service";
import { toast } from "react-toastify";

const EditPostPage = () => {
    // get post id from params
    const { postId } = useParams();

    // useState
    const [formData, setFormData] = useState({
        caption: "",
        location: "",
    });

    // navigate
    const navigate = useNavigate();

    // find post
    useEffect(() => {
        const fetchPost = async () => {
            if (!postId) return;
            try {
                const response = await getPostApi(Number(postId));

                setFormData({
                    caption: response.data.caption ?? "",
                    location: response.data.location ?? ""
                })
            } catch (error) {
                console.error(error)
            }
        }

        fetchPost();
    }, [postId])

    // handle edit 
    const handleUpdatePost = async () => {
        if (!postId) return;

        try {
            const response = await updatePostApi(Number(postId), {
                caption: formData.caption,
                location: formData.location
            });

            toast.success(response.message);

            navigate("/home-page");
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
                        Edit Post
                    </h1>

                    <p className="mt-2 text-zinc-400">
                        Update your post before sharing the changes.
                    </p>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
                    {/* Post Details */}
                    <div className="flex flex-col gap-6 lg:col-span-2">
                        <PostDetailsForm
                            formData={formData}
                            setFormData={setFormData}
                        />

                        <PublishButton
                            text="Update Post"
                            onClick={handleUpdatePost}
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default EditPostPage;