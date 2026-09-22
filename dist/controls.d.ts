import { InputHTMLAttributes, ReactNode } from "react";
import { Validator } from "./validation";
export type FormInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "name"> & {
    name: string;
    label: ReactNode;
    validators?: Validator[];
    hint?: ReactNode;
};
export declare function FormInput({ name, label, validators, hint, className, ...inputProps }: FormInputProps): import("react").JSX.Element;
type RadioOption = {
    value: string;
    label: ReactNode;
};
export type FormRadioGroupProps = {
    name: string;
    label: ReactNode;
    options: RadioOption[];
    validators?: Validator[];
};
export declare function FormRadioGroup({ name, label, options, validators }: FormRadioGroupProps): import("react").JSX.Element;
export type FormButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
};
export declare function FormButton({ loading, children, disabled, className, ...props }: FormButtonProps): import("react").JSX.Element;
export declare function FormError({ children }: {
    children?: ReactNode;
}): import("react").JSX.Element | null;
export {};
