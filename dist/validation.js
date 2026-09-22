export const rules = {
    required(message) {
        return (value) => {
            if (value === undefined || value === null || String(value).trim() === "")
                return message;
            return undefined;
        };
    },
    email(message) {
        return (value) => {
            if (!value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)))
                return undefined;
            return message;
        };
    },
    url(message) {
        return (value) => {
            if (!value)
                return undefined;
            try {
                new URL(String(value));
                return undefined;
            }
            catch (_a) {
                return message;
            }
        };
    },
    minLength(length, message) {
        return (value) => (!value || String(value).length >= length ? undefined : message);
    },
    maxLength(length, message) {
        return (value) => (!value || String(value).length <= length ? undefined : message);
    },
    pattern(pattern, message) {
        return (value) => (!value || pattern.test(String(value)) ? undefined : message);
    },
};
export function validateField(value, values, validators) {
    for (const validator of validators) {
        const message = validator(value, values);
        if (message)
            return message;
    }
    return undefined;
}
