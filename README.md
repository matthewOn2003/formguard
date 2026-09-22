# FormGuard

FormGuard is a reusable React form control and validation package.

## Installation

```bash
npm install formguard
```

## Example

```tsx
import { FormButton, FormGuard, FormInput, rules } from "formguard";
import "formguard/styles.css";

<FormGuard
  initialValues={{ website: "" }}
  onSubmit={async (values) => save(values)}
  tokens={{ focusColor: "#d64545", radius: "10px" }}
>
  <FormInput name="website" label="Website" validators={[rules.required("Website is required"), rules.url("Enter a valid website URL")]} />
  <FormButton>Save</FormButton>
</FormGuard>
```

Every token has a default value and can also be overridden with `--fg-*` CSS variables on `.fg-form` or a parent element.
