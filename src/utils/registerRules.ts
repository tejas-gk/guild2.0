interface ValidationRule {
    validator: (value: string) => boolean;
    message: string;
}

export const validationRules = {
    required: (
        message: string = 'This field is required.'
    ): ValidationRule => ({
        validator: (value: string) => Boolean(value.trim()),
        message,
    }),
    email: (
        message: string = 'Please enter a valid email address.'
    ): ValidationRule => ({
        validator: (value: string) =>
            Boolean(
                value.trim().match(
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // https://stackoverflow.com/a/46181/12381546
                )
            ),
        message,
    }),
    username: (
        message: string = 'Please enter a valid username.'
    ): ValidationRule => ({
        validator: (value: string) =>
            Boolean(
                value.trim().match(
                    /^[a-zA-Z0-9_]{3,15}$/ // 3-15 characters, letters, numbers, and underscores only
                )
            ),
        message,
    }),
    password: (
        message: string = 'Please enter a valid password.'
    ): ValidationRule => ({
        validator: (value: string) =>
            Boolean(
                value.trim().match(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ // https://stackoverflow.com/a/21456918/12381546
                )
            ),
        message,
    }),
};
