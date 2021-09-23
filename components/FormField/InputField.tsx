import { TextField } from "@mui/material";
import * as React from "react";
import { Control, useController } from "react-hook-form";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
  name: string;
  label: string;
}

export default function InputField({
  control,
  name,
  label,
  ...inputProps
}: InputFieldProps) {
  const {
    field: { onBlur, onChange, value, ref },
    fieldState: { invalid, error },
  } = useController({
    name: name,
    control: control,
  });
  return (
    <TextField
      fullWidth
      onBlur={onBlur}
      onChange={onChange}
      value={value}
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
      variant="outlined"
      margin="normal"
      inputProps={inputProps}
      label={label}
    />
  );
}
