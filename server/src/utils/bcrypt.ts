import bcrypt from "bcrypt";

// hash password function
export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10)
}

// compare password function
export const comparePassword = async (password: string, originalPassword: string) => {
    return await bcrypt.compare(password, originalPassword)
}