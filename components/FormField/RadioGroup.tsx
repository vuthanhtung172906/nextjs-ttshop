import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface RadioGroupFieldProps {
  name: string;
  label?: string;
  disable?: boolean;
  options: RadioOptiopns[];
  control: Control<any>;
}
export interface RadioOptiopns {
  label: string;
  value: string | number;
}
export function RadioGroupField({ name, control, label, disable, options }: RadioGroupFieldProps) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { invalid, error },
  } = useController({
    name: name,
    control: control,
  });
  return (
    <FormControl component="fieldset" fullWidth margin="normal">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup name={name} onBlur={onBlur} value={value} onChange={onChange}>
        {options.map((option) => (
          <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
        ))}
      </RadioGroup>
      <FormHelperText error={invalid}>{error?.message}</FormHelperText>
    </FormControl>
  );
}
