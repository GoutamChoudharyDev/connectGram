// RegisterFormData
export interface RegisterFormData {
    fullName: string;
    username: string;
    email: string;
    password: string;
}

// VerifyEmailData interface
export interface VerifyEmailData {
    email: string;
    otp: string;
}

// LoginFormData interface
export interface LoginFormData {
    email: string;
    password: string;
}