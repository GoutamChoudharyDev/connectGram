import { X } from "lucide-react";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { updateProfileApi } from "../service/profile.service";
import { toast } from "react-toastify";

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EditProfileModal = ({
    isOpen,
    onClose
}: EditProfileModalProps) => {
    // use states
    const [formData, setFormData] = useState({
        fullName: "",
        bio: "",
        website: ""
    })

    if (!isOpen) return null;

    // handle change
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await updateProfileApi(formData);
            onClose();
            toast.success(response.message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-white">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        Edit Profile
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-zinc-800"
                        type="button"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    {/* Full Name */}
                    <div>
                        <label className="mb-2 block text-sm text-zinc-400">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-white"
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="mb-2 block text-sm text-zinc-400">
                            Bio
                        </label>

                        <textarea
                            placeholder="Write something about yourself"
                            name="bio"
                            rows={4}
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-white"
                        />
                    </div>

                    {/* Website */}
                    <div>
                        <label className="mb-2 block text-sm text-zinc-400">
                            Website
                        </label>

                        <input
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="https://example.com"
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-white"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-lg border border-zinc-700 py-3 hover:bg-zinc-800"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="flex-1 rounded-lg bg-white py-3 font-semibold text-black hover:bg-zinc-200"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;