import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import "../css/ApproveLeave.css";
import { getPendingLeaves, processLeave } from "../services/leaveService";

function ApproveLeave() {
    const navigate = useNavigate();

    const [leaves, setLeaves] = useState([]);

    const [toast, setToast] = useState({
        message: "",
        type: "info"
    });

    useEffect(() => {
        loadPendingLeaves();
    }, []);

    const loadPendingLeaves = async () => {
        try {
            const leaveData = await getPendingLeaves();
            setLeaves(leaveData);

        } catch (error) {
            console.error(error);

            if (error.message === "UNAUTHORIZED") {
                navigate("/");
                return;
            }

            if (error.message === "NOT_AUTHORIZED") {
                setToast({
                    message: "Only Leads and Managers can view pending leaves.",
                    type: "error"
                });

                setTimeout(() => {
                    navigate("/dashboard");
                }, 500);

                return;
            }

            setToast({
                message: error.message || "Unable to load pending leaves.",
                type: "error"
            });
        }
    };

    const handleProcessLeave = async (leaveId, action) => {
        try {
            await processLeave(leaveId, action);

            setToast({
                message:
                    action === "approve"
                        ? "Leave approved successfully."
                        : "Leave rejected successfully.",
                type: "success"
            });

            setTimeout(() => {
                loadPendingLeaves();
            }, 500);

        } catch (error) {
            console.error(error);

            if (error.message === "UNAUTHORIZED") {
                navigate("/");
                return;
            }

            setToast({
                message: error.message || "Unable to process leave request.",
                type: "error"
            });
        }
    };

    const approveLeave = (leaveId) => {
        handleProcessLeave(leaveId, "approve");
    };

    const rejectLeave = (leaveId) => {
        handleProcessLeave(leaveId, "reject");
    };

    return (
        <>
            <Toast
                message={toast.message}
                type={toast.type}
            />

            <div className="pending-container">

                <div className="pending-card">

                    <div className="page-header">

                        <h1>Pending Leave Requests</h1>

                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                        >
                            Back to Dashboard
                        </button>

                    </div>


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

                                {leaves.length === 0 ? (

                                    <tr>
                                        <td colSpan="7">
                                            No pending leave requests.
                                        </td>
                                    </tr>

                                ) : (

                                    leaves.map((leave) => (

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
                                                <div className="action-buttons">

                                                    <button
                                                        className="approve-button"
                                                        onClick={() =>
                                                            approveLeave(
                                                                leave.leaveId
                                                            )
                                                        }
                                                    >
                                                        Approve
                                                    </button>

                                                    <button
                                                        className="reject-button"
                                                        onClick={() =>
                                                            rejectLeave(
                                                                leave.leaveId
                                                            )
                                                        }
                                                    >
                                                        Reject
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </>
    );
}

export default ApproveLeave;