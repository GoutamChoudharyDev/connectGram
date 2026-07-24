import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import AuthContext from "./AuthContext";
import type { Profile } from "../features/profile/components/types/profile.types";
import { getMeApi } from "../features/auth/services/auth.service";

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchCurrentUser = async () => {
        try {
            const response = await getMeApi();
            setUser(response.data);
        } catch (error) {
            console.error(error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            await fetchCurrentUser();
        }

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                fetchCurrentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;