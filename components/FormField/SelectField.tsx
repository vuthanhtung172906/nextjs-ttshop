import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface SelectOptions {
  label: string;
  value: string;
}
export interface SelecFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  disable?: boolean;
  options: SelectOptions[];
}
export default function SelecField({ control, name, label, disable, options }: SelecFieldProps) {
  const {
    field: { onBlur, value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name: name,
    control: control,
  });

  return (
    <FormControl variant="outlined" fullWidth sx={{ maxHeight: '500px', marginY: '10px' }}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>

      <Select labelId={`${name}-label`} value={value} onBlur={onBlur} onChange={onChange} label={label}>
        <MenuItem disabled value="">
          {label}
        </MenuItem>
        {options.map((option, idx) => (
          <MenuItem key={idx} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={invalid}>{error?.message}</FormHelperText>
    </FormControl>
  );
}
