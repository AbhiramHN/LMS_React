export async function registerEmployee(employee) {
    const response = await fetch("/api/v1/employees/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    });

    if (response.ok) {
        return response;
    }

    const error = await response.text();

    throw new Error(error || "Registration failed");
}