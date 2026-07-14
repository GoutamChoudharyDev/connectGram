// verification Email template
export const verificationEmailTemplate = (
    fullName: string,
    otp: string
): string => {
    return `
        <h2>Hello ${fullName},</h2>

        <p>Your verification code is:</p>

        <h1>${otp}</h1>

        <p>This code expires in 10 minutes.</p>

        <p>ConnectGram Team</p>
    `;
}