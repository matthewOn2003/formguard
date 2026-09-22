"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { validateField } from "./validation";
const defaultTokens = {
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
const FormGuardContext = createContext(null);
export function FormGuard({ initialValues = {}, onSubmit, children, className = "", tokens }) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const fields = useRef({});
    const mergedTokens = Object.assign(Object.assign({}, defaultTokens), tokens);
    const setValue = useCallback((name, value) => {
        setValues((current) => (Object.assign(Object.assign({}, current), { [name]: value })));
        setErrors((current) => {
            if (!current[name])
                return current;
            const next = Object.assign({}, current);
            delete next[name];
            return next;
        });
    }, []);
    const register = useCallback((name, validators) => {
        fields.current[name] = { validators };
    }, []);
    const contextValue = useMemo(() => ({ values, errors, setValue, register }), [values, errors, setValue, register]);
    const style = Object.fromEntries(Object.entries(mergedTokens).map(([key, value]) => [`--fg-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`, value]));
    async function handleSubmit(event) {
        event.preventDefault();
        const nextErrors = {};
        for (const [name, field] of Object.entries(fields.current)) {
            const message = validateField(values[name], values, field.validators);
            if (message)
                nextErrors[name] = message;
        }
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0)
            return;
        await onSubmit(values);
    }
    return (_jsx(FormGuardContext.Provider, { value: contextValue, children: _jsx("form", { className: `fg-form ${className}`, style: style, onSubmit: handleSubmit, noValidate: true, children: children }) }));
}
export function useFormGuard() {
    const context = useContext(FormGuardContext);
    if (!context)
        throw new Error("FormGuard controls must be rendered inside <FormGuard>");
    return context;
}
export const formGuardDefaultTokens = defaultTokens;
