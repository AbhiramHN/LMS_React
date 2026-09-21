import { HTTP_STATUS } from "../constants/httpStatus";

export async function generateReport() {
    const response = await fetch("/api/v1/generateReport", {
        credentials: "include"
    });

    if (response.ok) {
        return;
    }

    if (response.status === HTTP_STATUS.UNAUTHORIZED) {
        throw new Error("UNAUTHORIZED");
    }

    if (response.status === HTTP_STATUS.FORBIDDEN) {
        throw new Error("NOT_AUTHORIZED");
    }

    const error = await response.text();

    throw new Error(error || "Unable to generate report.");
}