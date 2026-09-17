export async function getLeaveHistory() {
    const response = await fetch("/api/v1/leave/history");

    if (response.ok) {
        return response.json();
    }

    if (response.status === HTTP_STATUS.UNAUTHORIZED) {
        throw new Error("UNAUTHORIZED");
    }

    const error = await response.text();

    throw new Error(error || "Unable to load leave history.");
}


export async function applyLeave(leaveRequest) {
    const response = await fetch("/api/v1/leave/apply", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(leaveRequest)
    });

    if (response.ok) {
        return;
    }

    if (response.status === HTTP_STATUS.UNAUTHORIZED) {
        throw new Error("UNAUTHORIZED");
    }

    const error = await response.text();

    throw new Error(error || "Unable to submit leave request.");
}


export async function getPendingLeaves() {
    const response = await fetch("/api/v1/leave/pending");

    if (response.ok) {
        return response.json();
    }

    if (response.status === HTTP_STATUS.UNAUTHORIZED) {
        throw new Error("UNAUTHORIZED");
    }

    if (response.status === HTTP_STATUS.FORBIDDEN) {
        throw new Error("NOT_AUTHORIZED");
    }

    const error = await response.text();

    throw new Error(error || "Unable to load pending leaves.");
}


export async function processLeave(leaveId, action) {
    const response = await fetch(`/api/v1/leave/${leaveId}/${action}`, {
        method: "PUT"
    });

    if (response.ok) {
        return;
    }

    if (response.status === HTTP_STATUS.UNAUTHORIZED) {
        throw new Error("UNAUTHORIZED");
    }

    const error = await response.text();

    throw new Error(error || "Unable to process leave request.");
}

export async function getRevocableLeaves() {
    const response = await fetch("/api/v1/leave/revocable");

    if (response.ok) {
        return response.json();
    }

    if (response.status === HTTP_STATUS.UNAUTHORIZED) {
        throw new Error("UNAUTHORIZED");
    }

    if (response.status === HTTP_STATUS.FORBIDDEN) {
        throw new Error("NOT_AUTHORIZED");
    }

    const error = await response.text();

    throw new Error(error || "Unable to load revocable leaves.");
}

export async function revokeLeave(leaveId) {
    const response = await fetch(`/api/v1/leave/${leaveId}/revoke`, {
        method: "PUT"
    });

    if (response.ok) {
        return;
    }

    if (response.status === HTTP_STATUS.UNAUTHORIZED) {
        throw new Error("UNAUTHORIZED");
    }

    const error = await response.text();

    throw new Error(error || "Unable to revoke leave.");
}