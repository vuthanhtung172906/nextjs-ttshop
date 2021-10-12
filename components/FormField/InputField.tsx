import { TextField } from '@mui/material';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
  name: string;
  label: string;
  margin?: 'normal' | 'none' | 'dense' | undefined;
  size2?: 'small' | 'medium' | undefined;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
}

export default function InputField({
  control,
  multiline = false,
  minRows = 1,
  maxRows = 1,
  name,
  label,
  margin = 'normal',
  size2 = 'medium',
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
      size={size2}
      helperText={error?.message}
      variant="outlined"
      margin={margin}
      inputProps={inputProps}
      label={label}
      multiline={multiline}
      minRows={minRows}
      maxRows={maxRows}
    />
  );
}
