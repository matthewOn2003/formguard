"use client";

import { createContext, CSSProperties, FormEvent, ReactNode, useCallback, useContext, useMemo, useRef, useState } from "react";
import { FormValues, validateField, Validator } from "./validation";

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

const defaultTokens: FormGuardTokens = {
  radius: "4px",
  fieldGap: "18px",
  controlHeight: "46px",
  borderColor: "#d8dee8",
  focusColor: "#5268e8",
  textColor: "#202344",
  mutedColor: "#747994",
  labelColor: "#202344",
  errorColor: "#c33f4e",
  inputBackground: "#ffffff",
  buttonBackground: "#5268e8",
  buttonColor: "#ffffff",
};

type FieldRegistration = { validators: Validator[] };
type FormGuardContextValue = {
  values: FormValues;
  errors: Record<string, string>;
  setValue: (name: string, value: unknown) => void;
  register: (name: string, validators: Validator[]) => void;
};

const FormGuardContext = createContext<FormGuardContextValue | null>(null);

export type FormGuardProps = {
  initialValues?: FormValues;
  onSubmit: (values: FormValues) => void | Promise<void>;
  children: ReactNode;
  className?: string;
  tokens?: Partial<FormGuardTokens>;
};

export function FormGuard({ initialValues = {}, onSubmit, children, className = "", tokens }: FormGuardProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fields = useRef<Record<string, FieldRegistration>>({});
  const mergedTokens = { ...defaultTokens, ...tokens };

  const setValue = useCallback((name: string, value: unknown) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }, []);

  const register = useCallback((name: string, validators: Validator[]) => {
    fields.current[name] = { validators };
  }, []);

  const contextValue = useMemo(() => ({ values, errors, setValue, register }), [values, errors, setValue, register]);
  const style = Object.fromEntries(Object.entries(mergedTokens).map(([key, value]) => [`--fg-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`, value])) as CSSProperties;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    for (const [name, field] of Object.entries(fields.current)) {
      const message = validateField(values[name], values, field.validators);
      if (message) nextErrors[name] = message;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    await onSubmit(values);
  }

  return (
    <FormGuardContext.Provider value={contextValue}>
      <form className={`fg-form ${className}`} style={style} onSubmit={handleSubmit} noValidate>
        {children}
      </form>
    </FormGuardContext.Provider>
  );
}

export function useFormGuard() {
  const context = useContext(FormGuardContext);
  if (!context) throw new Error("FormGuard controls must be rendered inside <FormGuard>");
  return context;
}

export const formGuardDefaultTokens = defaultTokens;
