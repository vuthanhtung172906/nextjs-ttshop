import { Button, CircularProgress, Typography } from '@mui/material';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box } from '@mui/system';
import Link from '../../configs/mui/Link';
import InputField from '../../components/FormField/InputField';
import { User } from '../../types';
import { GoogleLogin } from 'react-google-login';
import userApi from '../../api/axiosUser';
import { useAppDispatch } from '../../app/hooks';
import { userAction } from './userSlice';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Google } from '@mui/icons-material';

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
  const router = useRouter();
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
  const dispatch = useAppDispatch();
  const responseGoogle = async (response: any) => {
    try {
      const res = await userApi.googleLogin(response.tokenId);
      dispatch(userAction.getUserSucces(res));
      localStorage.setItem('login', 'true');
      localStorage.setItem('accesstoken', res.access_token);
      toast.success('Login Success');
      router.push('/');
    } catch (error) {
      throw error;
    }
  };
  const responseFacebook = (response: any) => {
    console.log({ response });
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
      <Box sx={{ marginTop: '10px' }}>
        <GoogleLogin
          clientId="741489416671-879jd1j1adptivdh5ct5j24c6ugaf73d.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          cookiePolicy={'single_host_origin'}
          render={(renderProps) => (
            <Button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              startIcon={<Google />}
              variant="outlined"
              fullWidth
            >
              LOG IN WITH GOOGLE
            </Button>
          )}
        />
      </Box>
    </div>
  );
}
