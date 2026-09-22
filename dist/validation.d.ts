export type FormValues = Record<string, unknown>;
export type Validator = (value: unknown, values: FormValues) => string | undefined;
export declare const rules: {
    required(message: string): Validator;
    email(message: string): Validator;
    url(message: string): Validator;
    minLength(length: number, message: string): Validator;
    maxLength(length: number, message: string): Validator;
    pattern(pattern: RegExp, message: string): Validator;
};
export declare function validateField(value: unknown, values: FormValues, validators: Validator[]): string | undefined;
