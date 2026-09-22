"use client";

import { InputHTMLAttributes, ReactNode, useEffect } from "react";
import { useFormGuard } from "./FormGuard";
import { Validator } from "./validation";

export type FormInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "name"> & {
  name: string;
  label: ReactNode;
  validators?: Validator[];
  hint?: ReactNode;
};

export function FormInput({ name, label, validators = [], hint, className = "", ...inputProps }: FormInputProps) {
  const { values, errors, setValue, register } = useFormGuard();
  const error = errors[name];

  useEffect(() => {
    register(name, validators);
  }, [name, register, validators]);

  return (
    <div className={`fg-field ${className}`}>
      <label className="fg-label" htmlFor={name}>{label}</label>
      <input
        {...inputProps}
        id={name}
        className={`fg-control ${error ? "fg-control-error" : ""}`}
        value={String(values[name] ?? "")}
        onChange={(event) => setValue(name, event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
      />
      {error ? <p className="fg-error" id={`${name}-error`}>{error}</p> : hint ? <p className="fg-hint" id={`${name}-hint`}>{hint}</p> : null}
    </div>
  );
}

type RadioOption = { value: string; label: ReactNode };
export type FormRadioGroupProps = {
  name: string;
  label: ReactNode;
  options: RadioOption[];
  validators?: Validator[];
};

export function FormRadioGroup({ name, label, options, validators = [] }: FormRadioGroupProps) {
  const { values, errors, setValue, register } = useFormGuard();
  const error = errors[name];

  useEffect(() => {
    register(name, validators);
  }, [name, register, validators]);

  return (
    <fieldset className="fg-field fg-radio-field">
      <legend className="fg-label">{label}</legend>
      <div className="fg-radio-group">
        {options.map((option) => (
          <label className="fg-radio-option" key={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={values[name] === option.value}
              onChange={() => setValue(name, option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error ? <p className="fg-error">{error}</p> : null}
    </fieldset>
  );
}

export type FormButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export function FormButton({ loading = false, children, disabled, className = "", ...props }: FormButtonProps) {
  return (
    <button {...props} className={`fg-button ${className}`} disabled={disabled || loading} type={props.type ?? "submit"}>
      {loading ? "..." : children}
    </button>
  );
}

export function FormError({ children }: { children?: ReactNode }) {
  return children ? <p className="fg-form-error">{children}</p> : null;
}