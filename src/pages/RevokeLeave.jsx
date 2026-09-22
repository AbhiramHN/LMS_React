import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import "../css/RevokeLeave.css";
import { getRevocableLeaves, revokeLeave } from "../services/leaveService";

function RevokeLeave() {
    const navigate = useNavigate();

    const [leaves, setLeaves] = useState([]);

    const [toast, setToast] = useState({
        message: "",
        type: "info"
    });

    useEffect(() => {
        loadRevocableLeaves();
    }, []);

    const loadRevocableLeaves = async () => {
        try {
            const leaveData = await getRevocableLeaves();
            setLeaves(leaveData);

        } catch (error) {
            console.error(error);

            if (error.message === "UNAUTHORIZED") {
                navigate("/");
                return;
            }

            if (error.message === "NOT_AUTHORIZED") {
                setToast({
                    message: "Only Leads and Managers can revoke leaves.",
                    type: "error"
                });

                setTimeout(() => {
                    navigate("/dashboard");
                }, 500);

                return;
            }

            setToast({
                message: error.message || "Unable to load revocable leaves.",
                type: "error"
            });
        }
    };

    const handleRevokeLeave = async (leaveId) => {
        try {
            await revokeLeave(leaveId);

            setToast({
                message: "Leave revoked successfully.",
                type: "success"
            });

            setTimeout(() => {
                loadRevocableLeaves();
            }, 500);

        } catch (error) {
            console.error(error);

            if (error.message === "UNAUTHORIZED") {
                navigate("/");
                return;
            }

            setToast({
                message: error.message || "Unable to revoke leave.",
                type: "error"
            });
        }
    };

    return (
        <>
            <Toast
                message={toast.message}
                type={toast.type}
            />

            <div className="revoke-container">

                <div className="revoke-card">

                    <div className="page-header">

                        <h1>Revoke Leave</h1>

                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            >
                            Back to Dashboard
                        </button>

                    </div>

                    {leaves.length === 0 ? (

                        <div className="no-history">

                            <h2>No Leaves To Revoke</h2>

                            <p>
                                YYou do not have any approved leaves available for revocation.
                            </p>

                        </div>

                    ): (
                    <div className="table-container">

                        <table>

                            <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Leave Type</th>
                                    <th>From Date</th>
                                    <th>To Date</th>
                                    <th>Days</th>
                                    <th>Reason</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {leaves.map((leave) => (

                                    <tr key={leave.leaveId}>

                                        <td>
                                            {leave.employeeId}
                                        </td>

                                        <td>
                                            {leave.leaveType}
                                        </td>

                                        <td>
                                            {leave.fromDate}
                                        </td>

                                        <td>
                                            {leave.toDate}
                                        </td>

                                        <td>
                                            {leave.numberOfDays}
                                        </td>

                                        <td>
                                            {leave.reason}
                                        </td>

                                        <td>
                                            <button
                                                className="revoke-button"
                                                onClick={() => handleRevokeLeave(leave.leaveId)}
                                            >
                                                Revoke
                                            </button>
                                        </td>

                                    </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                    )}

                </div>

            </div>
        </>
    );
}

export default RevokeLeave;