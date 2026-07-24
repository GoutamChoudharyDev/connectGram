interface PostMediaProps {
    image: string;
}

const PostMedia = ({ image }: PostMediaProps) => {
    return (
        <div className="overflow-hidden border-y border-zinc-800 bg-zinc-900">
            <img
                src={image}
                alt="Post"
                className="h-auto max-h-[650px] w-full object-cover transition duration-300 hover:scale-[1.02]"
            />
        </div>
    );
};

export default PostMedia;