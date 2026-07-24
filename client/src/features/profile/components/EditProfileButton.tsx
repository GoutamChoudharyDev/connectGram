import { useState } from "react";
import EditProfileModal from "./EditProfileModal";

const EditProfileButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-2 font-semibold text-white transition hover:bg-zinc-800"
            >
                Edit Profile
            </button>

            <EditProfileModal
                isOpen={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
};

export default EditProfileButton;