export type FormValues = Record<string, unknown>;
export type Validator = (value: unknown, values: FormValues) => string | undefined;

export const rules = {
  required(message: string): Validator {
    return (value) => {
      if (value === undefined || value === null || String(value).trim() === "") return message;
      return undefined;
    };
  },

  email(message: string): Validator {
    return (value) => {
      if (!value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))) return undefined;
      return message;
    };
  },

  url(message: string): Validator {
    return (value) => {
      if (!value) return undefined;
      try {
        new URL(String(value));
        return undefined;
      } catch {
        return message;
      }
    };
  },

  minLength(length: number, message: string): Validator {
    return (value) => (!value || String(value).length >= length ? undefined : message);
  },

  maxLength(length: number, message: string): Validator {
    return (value) => (!value || String(value).length <= length ? undefined : message);
  },

  pattern(pattern: RegExp, message: string): Validator {
    return (value) => (!value || pattern.test(String(value)) ? undefined : message);
  },
};

export function validateField(value: unknown, values: FormValues, validators: Validator[]) {
  for (const validator of validators) {
    const message = validator(value, values);
    if (message) return message;
  }
  return undefined;
}
