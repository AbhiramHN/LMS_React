export const validateName = (value) => {
    if (!value.trim()) {
        return "Name is required";
    }

    if (!/^[A-Za-z ]+$/.test(value)) {
        return "Name should contain only letters and spaces";
    }

    return "";
};



export const validateAge = (value) => {
    if (!value) {
        return "Age is required";
    }

    if (!/^\d+$/.test(value)) {
        return "Age should contain only numbers";
    }

    const numericAge = Number(value);

    if (numericAge < 18 || numericAge > 60) {
        return "Age must be between 18 and 60";
    }

    return "";
};

export const validateEmail = (value) => {
    if (!value.trim()) {
        return "Email is required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Enter a valid email address";
    }

    return "";
};


export const validateDesignation = (value) => {
    if (!value) {
        return "Please select a designation";
    }

    return "";
};


export const validateGender = (value) => {
    if (!value) {
        return "Please select a gender";
    }

    return "";
};

export const validatePassword = (value) => {
    if (!value) {
        return "Password is required";
    }

    return "";
};