import { CircleHelp, Clock3 } from "lucide-react";

const VerifyEmailForm = () => {
    return (
        <div className="w-full max-w-[340px] rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-xl">
            {/* Heading */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white">
                    Verify Email
                </h2>

                <p className="mt-2 text-xs leading-5 text-zinc-400">
                    Enter the 6-digit verification code sent to
                </p>

                <p className="mt-1 text-sm font-medium text-blue-500">
                    alex@example.com
                </p>
            </div>

            {/* OTP Inputs */}
            <div className="mt-6 flex justify-center gap-1.5">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <input
                        key={item}
                        id={`otp-${item}`}
                        type="text"
                        maxLength={1}
                        inputMode="numeric"
                        className="h-10 w-10 rounded-lg border border-zinc-700 bg-zinc-800 text-center text-lg font-semibold text-white outline-none transition focus:border-blue-600"
                    />
                ))}
            </div>

            {/* Verify Button */}
            <button
                type="submit"
                className="mt-6 w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
            >
                Verify Email
            </button>

            {/* Timer */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-400">
                <Clock3 size={14} />

                <span>
                    Resend code in{" "}
                    <span className="font-semibold text-blue-500">
                        00:53
                    </span>
                </span>
            </div>

            {/* Resend */}
            <button
                type="button"
                className="mt-2 w-full text-center text-xs font-medium text-blue-500 hover:text-blue-400"
            >
                Resend Code
            </button>

            {/* Divider */}
            <div className="my-4 h-px bg-zinc-800" />

            {/* Help */}
            <button
                type="button"
                className="flex w-full items-center justify-center gap-2 text-xs text-zinc-400 transition hover:text-white"
            >
                <CircleHelp size={15} />
                Need Help?
            </button>
        </div>
    );
};

export default VerifyEmailForm;