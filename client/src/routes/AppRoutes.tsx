import LoginPage from "../features/auth/pages/LoginPage"
import RegisterPage from "../features/auth/pages/RegisterPage"
import { Routes, Route } from "react-router-dom"
// import VerifyEmailPage from "../features/auth/pages/VerifyEmailPage"
import ProfilePage from "../features/profile/pages/ProfilePage"
import HomePage from "../features/post/pages/HomePage"
import CreatePostPage from "../features/post/pages/CreatePostPage"
import EditPostPage from "../features/post/pages/EditPostPage"
import MessagesPage from "../features/chat/pages/MessagePage"
import ProtectedRoute from "./ProtectedRoute"

const AppRoutes = () => {
    console.log("working");

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* <Route path="/verify-otp" element={<VerifyEmailPage />} /> */}
            <Route
                path="/verify-otp"
                element={
                    <div className="min-h-screen bg-black p-10 text-3xl text-white">
                        VERIFY OTP ROUTE WORK
                    </div>
                }
            />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile/:username" element={<ProfilePage />} />
                <Route path="/post/add" element={<CreatePostPage />} />
                <Route path="/posts/:postId/edit" element={<EditPostPage />} />
                <Route path="/messages" element={<MessagesPage />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes