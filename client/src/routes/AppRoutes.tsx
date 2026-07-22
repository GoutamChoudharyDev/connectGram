import RegisterPage from "../features/auth/pages/RegisterPage"
import { Routes, Route } from "react-router-dom"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    )
}

export default AppRoutes