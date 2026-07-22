const ProfileBio = () => {
    return (
        <div className="mt-4 space-y-2">
            {/* Full Name */}
            <h2 className="text-sm font-semibold text-white">
                Goutam Choudhary
            </h2>

            {/* Bio */}
            <p className="max-w-md text-sm text-zinc-300">
                Full Stack Developer 🚀
                <br />
                Building modern web applications with React, Node.js and PostgreSQL.
            </p>

            {/* Website */}
            <a
                href="#"
                className="text-sm font-medium text-blue-400 hover:underline"
            >
                goutam.dev
            </a>
        </div>
    );
};

export default ProfileBio;