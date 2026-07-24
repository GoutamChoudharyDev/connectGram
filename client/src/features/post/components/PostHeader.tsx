import { MoreHorizontal } from "lucide-react";

interface User {
    id: number;
    name: string;
    username: string;
    avatar: string;
}

interface PostHeaderProps {
    user: User;
    createdAt: string;
}

const PostHeader = ({ user, createdAt }: PostHeaderProps) => {
    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-11 w-11 rounded-full object-cover"
                />

                <div>
                    <h3 className="text-sm font-semibold text-white">
                        {user.name}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <span>@{user.username}</span>
                        <span>•</span>
                        <span>{createdAt}</span>
                    </div>
                </div>
            </div>

            <button className="rounded-full p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white">
                <MoreHorizontal size={20} />
            </button>
        </div>
    );
};

export default PostHeader;