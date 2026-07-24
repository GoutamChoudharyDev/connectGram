import { createContext } from "react";
import type { Profile } from "../features/profile/components/types/profile.types";

export interface AuthContextType {
    user: Profile | null;
    loading: boolean;
    fetchCurrentUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;