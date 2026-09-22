export async function verifyEmail(token) {
    const response = await fetch(
        `/api/v1/auth/verify-email?token=${encodeURIComponent(token)}`
    );

    const data = await response.text();

    if (!response.ok) {
        throw new Error(data || "Email verification failed.");
    }

    return data;
}