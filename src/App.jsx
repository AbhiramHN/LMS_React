import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RequestLeave from "./pages/RequestLeave";
import LeaveHistory from "./pages/LeaveHistory";
import ApproveLeave from "./pages/ApproveLeave";
import RevokeLeave from "./pages/RevokeLeave";
import NotFound from "./pages/NotFound";
import VerifyEmail from "./pages/VerifyEmail";
import RegistrationPending from "./pages/RegistrationPending";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/registration-pending" element={<RegistrationPending />} />
                <Route path="/verify-email" element={<VerifyEmail />} />

                <Route path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route path="/request-leave"
                    element={
                        <ProtectedRoute>
                            <RequestLeave />
                        </ProtectedRoute>
                    }
                />

                <Route path="/leave-history"
                    element={
                        <ProtectedRoute>
                            <LeaveHistory />
                        </ProtectedRoute>
                    }
                />

                <Route path="/approve-leave"
                    element={
                        <ProtectedRoute>
                            <ApproveLeave />
                        </ProtectedRoute>
                    }
                />

                <Route path="/revoke-leave"
                    element={
                        <ProtectedRoute>
                            <RevokeLeave />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;