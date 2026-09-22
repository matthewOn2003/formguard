import { ReactNode } from "react";
import { FormValues, Validator } from "./validation";
export type FormGuardTokens = {
    radius: string;
    fieldGap: string;
    controlHeight: string;
    borderColor: string;
    focusColor: string;
    textColor: string;
    mutedColor: string;
    labelColor: string;
    errorColor: string;
    inputBackground: string;
    buttonBackground: string;
    buttonColor: string;
};
type FormGuardContextValue = {
    values: FormValues;
    errors: Record<string, string>;
    setValue: (name: string, value: unknown) => void;
    register: (name: string, validators: Validator[]) => void;
};
export type FormGuardProps = {
    initialValues?: FormValues;
    onSubmit: (values: FormValues) => void | Promise<void>;
    children: ReactNode;
    className?: string;
    tokens?: Partial<FormGuardTokens>;
};
export declare function FormGuard({ initialValues, onSubmit, children, className, tokens }: FormGuardProps): import("react").JSX.Element;
export declare function useFormGuard(): FormGuardContextValue;
export declare const formGuardDefaultTokens: FormGuardTokens;
export {};
