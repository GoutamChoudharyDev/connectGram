import LoginPage from "../features/auth/pages/LoginPage"
import RegisterPage from "../features/auth/pages/RegisterPage"
import { Routes, Route } from "react-router-dom"
import VerifyEmailPage from "../features/auth/pages/VerifyEmailPage"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-otp" element={<VerifyEmailPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    )
}

export default AppRoutes