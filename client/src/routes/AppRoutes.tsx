import LoginPage from "../features/auth/pages/LoginPage"
import RegisterPage from "../features/auth/pages/RegisterPage"
import { Routes, Route } from "react-router-dom"
import VerifyEmailPage from "../features/auth/pages/VerifyEmailPage"
import ProfilePage from "../features/profile/pages/ProfilePage"
import HomePage from "../features/post/pages/HomePage"
import CreatePostPage from "../features/post/pages/CreatePostPage"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-otp" element={<VerifyEmailPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/Home-page" element={<HomePage />} />
            <Route path="/post/add" element={<CreatePostPage />} />
        </Routes>
    )
}

export default AppRoutes