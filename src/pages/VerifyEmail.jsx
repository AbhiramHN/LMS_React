import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { verifyEmail } from "../services/emailService";

function VerifyEmail() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [message, setMessage] = useState("Verifying your email...");
    const [success, setSuccess] = useState(false);

    const verificationStarted = useRef(false);

    useEffect(() => {
        if (verificationStarted.current) {
            return;
        }

        verificationStarted.current = true;

        const token = searchParams.get("token");

        if (!token) {
            setMessage("Invalid verification link.");
            return;
        }

        const verify = async () => {
            try {
                await verifyEmail(token);

                setMessage("Email verified successfully. Your account has been created.");
                setSuccess(true);

                setTimeout(() => {
                    navigate("/");
                }, 20);
            } catch (error) {
                setMessage(error.message);
            }
        };

        verify();
    }, [searchParams]);

    return (
        <div>
            <h1>{message}</h1>

            {success && (
                <button onClick={() => navigate("/")}>
                    Go to Login
                </button>
            )}
        </div>
    );
}

export default VerifyEmail;