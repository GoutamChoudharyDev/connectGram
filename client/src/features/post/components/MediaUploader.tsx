import { ImagePlus } from "lucide-react";
import { useRef, type ChangeEvent, type Dispatch, type SetStateAction } from "react";

interface MediaUploaderProps {
    files: File[];
    setFiles: Dispatch<SetStateAction<File[]>>;
}

const MediaUploader = ({ files, setFiles }: MediaUploaderProps) => {
    // useRef
    const fileInputRef = useRef<HTMLInputElement>(null);

    // handleFileChange
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        console.log("files : ", files);
        console.log("selectedfiles : ", selectedFiles);

        if (!selectedFiles) return;

        setFiles(Array.from(selectedFiles));
    }

    return (
        <div className="flex h-[500px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-900 px-6 text-center transition hover:border-blue-500">
            <div className="mb-6 rounded-full bg-zinc-800 p-5">
                <ImagePlus className="h-12 w-12 text-zinc-400" />
            </div>

            <h2 className="text-2xl font-semibold text-white">
                Drag photos & videos here
            </h2>

            <p className="mt-3 max-w-sm text-sm text-zinc-400">
                Upload images or videos to share with your followers. Supported
                formats include JPG, PNG, WEBP, MP4, and MOV.
            </p>

            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500"
            >
                Select from computer
            </button>

            {/* Hidden input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*, video/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
            />

            <p className="mt-4 text-xs text-zinc-500">
                Maximum file size: 10 MB per file
            </p>
        </div>
    );
};

export default MediaUploader;