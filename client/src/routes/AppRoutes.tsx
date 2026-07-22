import LoginPage from "../features/auth/pages/LoginPage"
import RegisterPage from "../features/auth/pages/RegisterPage"
import { Routes, Route } from "react-router-dom"
import VerifyEmailPage from "../features/auth/pages/VerifyEmailPage"
import ProfilePage from "../features/profile/pages/ProfilePage"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-otp" element={<VerifyEmailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
    )
}

export default AppRoutes