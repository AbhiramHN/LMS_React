import { useEffect, useState } from "react";
import { getCurrentEmployee, logout } from "../services/authService";
import { generateReport } from "../services/reportService";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import "../css/Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);

    const [toast, setToast] = useState({
        message: "",
        type: "info"
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const employeeData = await getCurrentEmployee();
            setEmployee(employeeData);

        } catch (error) {
            console.error(error);

            if (error.message === "UNAUTHORIZED") {
                navigate("/");
                return;
            }

            setToast({
                message: error.message || "Unable to load user information.",
                type: "error"
            });
        }
    };

    const handleGenerateReport = async () => {
        try {
            await generateReport();

            setToast({
                message: "Report generation started.",
                type: "success"
            });

        } catch (error) {
            console.error(error);

            if (error.message === "UNAUTHORIZED") {
                navigate("/");
                return;
            }

            if (error.message === "NOT_AUTHORIZED") {
                setToast({
                    message: "Not Authorized.",
                    type: "error"
                });
                return;
            }

            setToast({
                message: error.message || "Unable to generate report.",
                type: "error"
            });
        }
    };

    const handleLogout = async () => {
        try {
            await logout();

            setToast({
                message: "Logout successful!",
                type: "success"
            });

            setTimeout(() => {
                navigate("/");
            }, 500);

        } catch (error) {
            console.error(error);

            setToast({
                message: error.message || "Unable to logout.",
                type: "error"
            });
        }
    };

    if (!employee) {
        return (
            <>
                <Toast
                    message={toast.message}
                    type={toast.type}
                />

                <div className="dashboard-loading">
                    Loading...
                </div>
            </>
        );
    }

    const isManager = employee.designation === "MANAGER";
    const isLead = employee.designation === "LEAD";

    return (
        <>
            <Toast
                message={toast.message}
                type={toast.type}
            />

            <div className="dashboard-container">

                <div className="dashboard-header">

                    <div>
                        <h1>Leave Management System</h1>
                    </div>

                    <div className="user-section">

                        <span className="user-name">
                            {employee.name}
                        </span>

                        <button
                            className="header-logout"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>

                </div>


                <div className="dashboard-grid">

                    <div className="employee-card">

                        <h2>Profile</h2>

                        <div className="employee-details">

                            <div className="detail-item">
                                <span>Employee ID</span>
                                <strong>
                                    {employee.employeeId}
                                </strong>
                            </div>

                            <div className="detail-item">
                                <span>Designation</span>
                                <strong>
                                    {employee.designation}
                                </strong>
                            </div>

                            <div className="detail-item">
                                <span>Name</span>
                                <strong>
                                    {employee.name}
                                </strong>
                            </div>

                        </div>

                    </div>


                    <div className="actions-card">

                        <h2>Quick Actions</h2>

                        <div className="action-grid">

                            <button
                                onClick={() => navigate("/request-leave")}
                            >
                                Request Leave
                            </button>

                            <button
                                onClick={() => navigate("/leave-history")}
                            >
                                Leave History
                            </button>

                            {(isManager || isLead) && (
                                <>
                                    <button
                                        onClick={() => navigate("/approve-leave")}
                                    >
                                        Approve Leave
                                    </button>

                                    {isManager && (
                                        <button onClick={handleGenerateReport}>
                                            Generate Report
                                        </button>
                                    )}

                                    <button
                                        onClick={() =>
                                            navigate("/revoke-leave")
                                        }
                                    >
                                        Revoke Leave
                                    </button>
                                </>
                            )}

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Dashboard;