import { MapPin, Smile } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";

interface PostDetailsFormProps {
    formData: {
        caption: string,
        location: string
    },
    setFormData: Dispatch<
        SetStateAction<{
            caption: string;
            location: string;
        }>
    >;
}

const PostDetailsForm = ({ formData, setFormData }: PostDetailsFormProps) => {
    const { user } = useAuth();

    // handleChange
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="flex h-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900">
            {/* User */}
            <div className="flex items-center gap-3 border-b border-zinc-800 p-5">
                <img
                    src={user?.profilePicture || "https://i.pravatar.cc/100?img=12"}
                    alt={user?.fullName}
                    className="h-12 w-12 rounded-full object-cover"
                />

                <div>
                    <h3 className="font-medium text-white">
                        {user?.fullName}
                    </h3>
                    <p className="text-sm text-zinc-400">
                        @{user?.username}
                    </p>
                </div>
            </div>

            {/* Caption */}
            <div className="flex-1 p-5">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-zinc-300">
                        Caption
                    </label>

                    <span className="text-xs text-zinc-500">
                        0 / 2200
                    </span>
                </div>

                <textarea
                    rows={8}
                    name="caption"
                    value={formData.caption}
                    onChange={handleChange}
                    placeholder="Write a caption..."
                    className="mt-3 w-full resize-none rounded-xl border border-zinc-700 bg-black p-4 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none"
                />

                <button
                    type="button"
                    className="mt-3 flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
                >
                    <Smile size={18} />
                    Add Emoji
                </button>
            </div>

            {/* Location */}
            <div className="border-t border-zinc-800 p-5">
                <label className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-300">
                    <MapPin size={18} />
                    Location
                </label>

                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Add location"
                    className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none"
                />
            </div>

            {/* Advanced Settings */}
            <div className="border-t border-zinc-800 p-5">
                <button
                    type="button"
                    className="w-full rounded-xl border border-zinc-700 px-4 py-3 text-left text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-800"
                >
                    Advanced Settings
                </button>
            </div>
        </div>
    );
};

export default PostDetailsForm;