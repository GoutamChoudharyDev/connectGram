import { CircleHelp, Clock3 } from "lucide-react";
import {
    useEffect,
    useRef,
    useState,
    type KeyboardEvent,
    type SubmitEvent,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resendOtpApi, verifyEmailApi } from "../services/auth.service";
import { toast } from "react-toastify";

interface LocationState {
    email: string;
}

const VerifyEmailForm = () => {
    // OTP State
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);

    // Resend Timer
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    // Navigation
    const navigate = useNavigate();
    const location = useLocation();

    const { email } = (location.state as LocationState) || {};

    // Redirect if email doesn't exist
    useEffect(() => {
        if (!email) {
            navigate("/register");
        }
    }, [email, navigate]);

    // OTP input refs
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Countdown Timer
    useEffect(() => {
        if (canResend) return;

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setCanResend(true);
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [canResend]);

    // OTP Change
    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Backspace
    const handleKeyDown = (
        e: KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key !== "Backspace") return;

        if (otp[index]) {
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
            return;
        }

        if (index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Verify Email
    const handleSubmit = async (
        e: SubmitEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const otpCode = otp.join("");

        if (otpCode.length !== 6) {
            toast.error("Please enter a 6 digit OTP");
            return;
        }

        try {
            setLoading(true);

            await verifyEmailApi({
                email,
                otp: otpCode,
            });

            toast.success("Email verified successfully");

            navigate("/login");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Resend OTP
    const handleResend = async () => {
        try {
            await resendOtpApi({ email });

            toast.success("OTP sent successfully");

            setOtp(["", "", "", "", "", ""]);

            setTimer(60);
            setCanResend(false);

            inputRefs.current[0]?.focus();
        } catch (error) {
            console.error(error);
        }
    };

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
                    {email}
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                {/* OTP */}
                <div className="mt-6 flex justify-center gap-1.5">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                inputRefs.current[index] = el;
                            }}
                            type="text"
                            value={digit}
                            maxLength={1}
                            inputMode="numeric"
                            onChange={(e) =>
                                handleOtpChange(index, e.target.value)
                            }
                            onKeyDown={(e) =>
                                handleKeyDown(e, index)
                            }
                            className="h-10 w-10 rounded-lg border border-zinc-700 bg-zinc-800 text-center text-lg font-semibold text-white outline-none transition focus:border-blue-600"
                        />
                    ))}
                </div>

                {/* Verify Button */}
                <button
                    type="submit"
                    disabled={
                        loading || otp.join("").length !== 6
                    }
                    className="mt-6 w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading
                        ? "Verifying Email..."
                        : "Verify Email"}
                </button>
            </form>

            {/* Timer */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-400">
                <Clock3 size={14} />

                <span>
                    Resend code in{" "}
                    <span className="font-semibold text-blue-500">
                        00:{timer.toString().padStart(2, "0")}
                    </span>
                </span>
            </div>

            {/* Resend */}
            <button
                type="button"
                onClick={handleResend}
                disabled={!canResend}
                className={`mt-2 w-full text-center text-xs font-medium ${canResend
                    ? "text-blue-500 hover:text-blue-400"
                    : "cursor-not-allowed text-zinc-500"
                    }`}
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