import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full max-w-[340px] rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-xl">
            {/* Heading */}
            <div className="mb-5 text-center">
                <h2 className="text-2xl font-bold text-white">
                    Welcome Back
                </h2>

                <p className="mt-1 text-xs text-zinc-400">
                    Sign in to continue your ConnectGram journey.
                </p>
            </div>

            <form className="space-y-3">
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
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-9 pr-9 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-600"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-white"
                    >
                        {showPassword ? (
                            <EyeOff size={16} />
                        ) : (
                            <Eye size={16} />
                        )}
                    </button>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="text-xs font-medium text-blue-500 hover:text-blue-400"
                    >
                        Forgot Password?
                    </button>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
                >
                    Sign In
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-zinc-700" />
                    <span className="text-xs text-zinc-500">OR</span>
                    <div className="h-px flex-1 bg-zinc-700" />
                </div>

                {/* Register */}
                <p className="text-center text-xs text-zinc-400">
                    Don't have an account?{" "}
                    <button
                        type="button"
                        className="font-semibold text-blue-500 hover:text-blue-400"
                    >
                        Create Account
                    </button>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;