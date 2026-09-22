"use client";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useFormGuard } from "./FormGuard";
export function FormInput(_a) {
    var _b;
    var { name, label, validators = [], hint, className = "" } = _a, inputProps = __rest(_a, ["name", "label", "validators", "hint", "className"]);
    const { values, errors, setValue, register } = useFormGuard();
    const error = errors[name];
    useEffect(() => {
        register(name, validators);
    }, [name, register, validators]);
    return (_jsxs("div", { className: `fg-field ${className}`, children: [_jsx("label", { className: "fg-label", htmlFor: name, children: label }), _jsx("input", Object.assign({}, inputProps, { id: name, className: `fg-control ${error ? "fg-control-error" : ""}`, value: String((_b = values[name]) !== null && _b !== void 0 ? _b : ""), onChange: (event) => setValue(name, event.target.value), "aria-invalid": Boolean(error), "aria-describedby": error ? `${name}-error` : hint ? `${name}-hint` : undefined })), error ? _jsx("p", { className: "fg-error", id: `${name}-error`, children: error }) : hint ? _jsx("p", { className: "fg-hint", id: `${name}-hint`, children: hint }) : null] }));
}
export function FormRadioGroup({ name, label, options, validators = [] }) {
    const { values, errors, setValue, register } = useFormGuard();
    const error = errors[name];
    useEffect(() => {
        register(name, validators);
    }, [name, register, validators]);
    return (_jsxs("fieldset", { className: "fg-field fg-radio-field", children: [_jsx("legend", { className: "fg-label", children: label }), _jsx("div", { className: "fg-radio-group", children: options.map((option) => (_jsxs("label", { className: "fg-radio-option", children: [_jsx("input", { type: "radio", name: name, value: option.value, checked: values[name] === option.value, onChange: () => setValue(name, option.value) }), _jsx("span", { children: option.label })] }, option.value))) }), error ? _jsx("p", { className: "fg-error", children: error }) : null] }));
}
export function FormButton(_a) {
    var _b;
    var { loading = false, children, disabled, className = "" } = _a, props = __rest(_a, ["loading", "children", "disabled", "className"]);
    return (_jsx("button", Object.assign({}, props, { className: `fg-button ${className}`, disabled: disabled || loading, type: (_b = props.type) !== null && _b !== void 0 ? _b : "submit", children: loading ? "..." : children })));
}
export function FormError({ children }) {
    return children ? _jsx("p", { className: "fg-form-error", children: children }) : null;
}
