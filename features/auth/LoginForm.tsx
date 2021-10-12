import { Button, CircularProgress, Typography } from '@mui/material';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box } from '@mui/system';
import Link from '../../configs/mui/Link';
import InputField from '../../components/FormField/InputField';
import { User } from '../../types';
export interface LoginFormProps {
  initialvalue: User;
  onSubmit: (formValue: User) => void;
}

export default function LoginForm({ initialvalue, onSubmit }: LoginFormProps) {
  const schemaValidate = yup.object().shape({
    email: yup.string().email('Email incorrect').required('Please enter email'),
    password: yup
      .string()
      .required('Please enter password')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'Minimum eight characters, at least one letter and one number'
      ),
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: initialvalue,
    resolver: yupResolver(schemaValidate),
  });
  const handleOnSubmit = async (formValue: User) => {
    await onSubmit(formValue);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <InputField control={control} name="email" label="Email" type="email" />
        <InputField control={control} name="password" label="Password" type="password" />

        <Button sx={{ marginTop: '20px' }} fullWidth variant="contained" color="primary" type="submit">
          {isSubmitting && <CircularProgress size={20} color="error" />}
          &nbsp; Submit
        </Button>
      </form>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '10px' }}>
        <Typography component="span" variant="subtitle1">
          <Link href="/" color="secondary" sx={{ textDecoration: 'none', color: '#111' }}>
            Forgot Password?
          </Link>
        </Typography>
        <Typography component="span" variant="subtitle1">
          <Link href="/auth/register" color="secondary" sx={{ textDecoration: 'none', color: '#111' }}>
            Create new account
          </Link>
        </Typography>
      </Box>
    </div>
  );
}
