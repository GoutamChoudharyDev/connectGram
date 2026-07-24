interface PostCaptionProps {
    username: string;
    caption: string;
}

const PostCaption = ({
    username,
    caption,
}: PostCaptionProps) => {
    return (
        <div className="text-sm leading-6">
            <span className="mr-2 font-semibold text-white">
                {username}
            </span>

            <span className="text-zinc-300">
                {caption}
            </span>
        </div>
    );
};

export default PostCaption;