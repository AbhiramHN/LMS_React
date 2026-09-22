import { HTTP_STATUS } from "../constants/httpStatus";

export async function login(employeeId, password) {
    const loginData = {
        employeeId,
        password
    };

    const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData),
        credentials: "include"
    });

    if (response.ok) {
        return;
    }

    const error = await response.text();

    throw new Error(error || "Invalid employee ID or password.");
}


export async function getCurrentEmployee() {
    const response = await fetch("/api/v1/auth/me", {
        credentials: "include"
    });

    if (response.ok) {
        return response.json();
    }

    if (response.status === HTTP_STATUS.UNAUTHORIZED) {
        throw new Error("UNAUTHORIZED");
    }

    const error = await response.text();

    throw new Error(error || "Unable to load user information.");
}


export async function logout() {
    const response = await fetch("/api/v1/auth/logout", {
        method: "POST",
        credentials: "include"
    });

    if (response.ok) {
        return;
    }

    throw new Error("Unable to logout.");
}