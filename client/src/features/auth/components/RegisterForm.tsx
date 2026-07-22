import { useState } from "react";
import {
    User,
    AtSign,
    Mail,
    Lock,
    Eye,
    EyeOff,
    CheckCircle2,
} from "lucide-react";

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="w-full max-w-xs rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-xl">
            {/* Heading */}
            <div className="mb-5 text-center">
                <h2 className="text-2xl font-bold text-white">
                    Create Account
                </h2>

                <p className="mt-1 text-xs text-zinc-400">
                    Join ConnectGram today.
                </p>
            </div>

            <form className="space-y-3">
                {/* Full Name */}
                <div className="relative">
                    <User
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    />

                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                    />
                </div>

                {/* Username */}
                <div className="relative">
                    <AtSign
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    />

                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                    />
                </div>

                {/* Email */}
                <div className="relative">
                    <Mail
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-9 pr-3 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-600"
                    />
                </div>

                {/* Password */}
                <div className="relative">
                    <Lock
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    />

                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-9 pr-10 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-600"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                    <Lock
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    />

                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-9 pr-10 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-600"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                    >
                        {showConfirmPassword ? (
                            <EyeOff size={16} />
                        ) : (
                            <Eye size={16} />
                        )}
                    </button>
                </div>

                {/* Password Hint */}
                <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                    <CheckCircle2 size={14} className="text-blue-500" />
                    Password must contain at least 6 characters.
                </div>

                {/* Register Button */}
                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
                >
                    Create Account
                </button>

                {/* Login */}
                <p className="text-center text-xs text-zinc-400">
                    Already have an account?{" "}
                    <button
                        type="button"
                        className="font-semibold text-blue-500 hover:text-blue-400"
                    >
                        Sign In
                    </button>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;