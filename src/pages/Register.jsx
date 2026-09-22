import { useState } from "react";
import { registerEmployee } from "../services/employeeService";
import {
    validateName,
    validateAge,
    validateEmail,
    validateDesignation,
    validateGender,
    validatePassword
} from "../validations/registerValidation";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import "../css/Register.css";


function Register() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [nameError, setNameError] = useState("");
    const [ageError, setAgeError] = useState("");
    const [designationError, setDesignationError] = useState("");
    const [genderError, setGenderError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");

    const [toast, setToast] = useState({
        message: "",
        type: "info"
    });

    const handleNameChange = (event) => {
        const value = event.target.value;

        setName(value);
        setNameError(validateName(value));
    };

    const handleEmailChange = (event) => {
        const value = event.target.value;

        setEmail(value);
        setEmailError(validateEmail(value));
    };

    const handleAgeChange = (event) => {
        const value = event.target.value;

        if (!/^\d*$/.test(value)) {
            return;
        }

        setAge(value);
        setAgeError(validateAge(value));
    };

    const handleDesignationChange = (event) => {
        const value = event.target.value;

        setDesignation(value);
        setDesignationError(validateDesignation(value));
    };

    const handleGenderChange = (event) => {
        const value = event.target.value;

        setGender(value);
        setGenderError(validateGender(value));
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;

        setPassword(value);
        setPasswordError(validatePassword(value));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const nameValidation = validateName(name);
        const emailValidation = validateEmail(email);
        const ageValidation = validateAge(age);
        const designationValidation = validateDesignation(designation);
        const genderValidation = validateGender(gender);
        const passwordValidation = validatePassword(password);

        setNameError(nameValidation);
        setEmailError(emailValidation);
        setAgeError(ageValidation);
        setDesignationError(designationValidation);
        setGenderError(genderValidation);
        setPasswordError(passwordValidation);

        if (
            nameValidation ||
            emailValidation ||
            ageValidation ||
            designationValidation ||
            genderValidation ||
            passwordValidation
        ) {
            return;
        }

        const employee = {
            name: name.trim(),
            email: email.trim(),
            designation,
            age: parseInt(age, 10),
            gender,
            password,
            joiningDate: new Date().toISOString().split("T")[0]
        };

        setLoading(true);

        try {
            await registerEmployee(employee);

            setTimeout(() => {
                navigate("/registration-pending");
            }, 10);
        } catch (error) {

            console.error(error);
            setToast({
                message: error.message || "Registration failed.",
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Toast
                message={toast.message}
                type={toast.type}
            />

            <div className="register-container">
                {loading && (
                    <div className="loading-overlay">
                        <div className="loading-spinner"></div>
                        <p>Processing registration...</p>
                    </div>
                )}
                <div className="register-card">

                    <h1>Employee Registration</h1>

                    <form id="registerForm" onSubmit={handleSubmit}>

                        <label htmlFor="name">
                            Name
                        </label>

                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={handleNameChange}
                        />

                        {nameError && (
                            <span className="error-message">
                                {nameError}
                            </span>
                        )}

                        <label htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {emailError && (
                            <span className="error-message">
                                {emailError}
                            </span>
                        )}


                        <label htmlFor="designation">
                            Designation
                        </label>

                        <select
                            id="designation"
                            value={designation}
                            onChange={handleDesignationChange}
                        >
                            <option value="">
                                Select Designation
                            </option>

                            <option value="EXECUTIVE">
                                Executive
                            </option>

                            <option value="LEAD">
                                Lead
                            </option>

                            <option value="MANAGER">
                                Manager
                            </option>
                        </select>

                        {designationError && (
                            <span className="error-message">
                                {designationError}
                            </span>
                        )}


                        <label htmlFor="age">
                            Age
                        </label>

                        <input
                            type="number"
                            id="age"
                            placeholder="Enter your age"
                            min="18"
                            max="60"
                            value={age}
                            onChange={handleAgeChange}
                        />

                        {ageError && (
                            <span className="error-message">
                                {ageError}
                            </span>
                        )}


                        <label htmlFor="gender">
                            Gender
                        </label>

                        <select
                            id="gender"
                            value={gender}
                            onChange={handleGenderChange}
                        >
                            <option value="">
                                Select Gender
                            </option>

                            <option value="MALE">
                                Male
                            </option>

                            <option value="FEMALE">
                                Female
                            </option>
                        </select>

                        {genderError && (
                            <span className="error-message">
                                {genderError}
                            </span>
                        )}


                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                        />

                        {passwordError && (
                            <span className="error-message">
                                {passwordError}
                            </span>
                        )}


                        <button type="submit" disabled={loading}>
                            Register
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            disabled={loading}
                        >
                            Go to Login
                        </button>

                    </form>

                </div>
            </div>
        </>
    );
}

export default Register;