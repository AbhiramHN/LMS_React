import { useNavigate } from "react-router-dom";
import "../css/RegistrationPending.css";

function RegistrationPending() {

    const navigate = useNavigate();

    return (
        <div className="registration-pending-container">
            <div className="registration-pending-card">

                <div className="registration-pending-icon">
                    ✓
                </div>

                <h1>Check Your Email</h1>

                <p>
                    Your registration has been submitted successfully.
                </p>

                <p>
                    We have sent a verification link to your email address.
                    Please check your inbox and click the link to complete
                    your registration.
                </p>

                <button
                    className="registration-pending-button"
                    onClick={() => navigate("/")}
                >
                    Go to Login
                </button>

            </div>
        </div>
    );
}

export default RegistrationPending;