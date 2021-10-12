import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, CircularProgress, Paper } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import UserSidebar from '../../components/common/UserSidebar';
import * as yup from 'yup';
import { User } from '../../types';
import InputField from '../../components/FormField/InputField';
import uploadApi from '../../api/UploadApi';
import userApi from '../../api/axiosUser';
import { userAction } from '../../features/auth/userSlice';
import { toast } from 'react-toastify';

export default function UserProfile() {
  const userprofile = useAppSelector((state) => state.user.user);
  const schemaValidat = yup.object().shape({
    email: yup.string().email('Email incorrect').required('Please enter email'),
    newpassword: yup.string(),
    username: yup.string().required('Please enter username'),
    passwordcomfirm: yup
      .string()
      .when('newpassword', (newpassword, field) =>
        newpassword ? field.required().oneOf([yup.ref('newpassword')]) : field
      ),
  });
  const dispatch = useAppDispatch();
  const initialValue: User = {
    username: userprofile.name as string,
    email: userprofile.email as string,
    newpassword: '' as string,
    passwordcomfirm: '' as string,
  };
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: initialValue,
    resolver: yupResolver(schemaValidat),
  });
  const handleSubmitProfile = async (formvalue: User) => {
    try {
      const formdata = new FormData();
      formdata.append('file', avatarimg.imageFile);
      const res = await uploadApi.uploadImg(formdata);
      console.log(userprofile.avatar?.public_id);
      await uploadApi.deleteImg(userprofile.avatar?.public_id);
      const res2 = await userApi.editprofile({
        username: formvalue.username,
        password: formvalue.newpassword,
        avatar: res,
      });
      dispatch(userAction.getAccessTokenFromRefreshToken());
      toast.success('Change profile success');
    } catch (error) {
      throw error;
    }
  };

  const [avatarimg, setAvatarImg] = React.useState<any>({
    imageUrl: userprofile.avatar?.url,
    imageFile: null,
  });
  const handleChangeAvatar = (event: any) => {
    const img = event.target.files[0];
    setAvatarImg({
      imageUrl: URL.createObjectURL(img),
      imageFile: img,
    });
  };

  return (
    <Box sx={{ display: 'flex', padding: '16px', flexDirection: { xs: 'column', sm: 'row' } }}>
      <UserSidebar />
      <Box sx={{ flex: 1 }}>
        <form onSubmit={handleSubmit(handleSubmitProfile)}>
          <Paper
            sx={{
              marginX: 'auto',
              maxWidth: '500px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              padding: '16px',
            }}
          >
            <Avatar src={avatarimg.imageUrl} sx={{ width: '100px', height: '100px' }} />

            <input type="file" name="avatar" onChange={() => handleChangeAvatar(event)} />
            <InputField control={control} name="username" type="text" label="Username" />
            <InputField control={control} disabled name="email" type="text" label="Email" />
            <InputField control={control} name="newpassword" type="password" label="New Password" />
            <InputField control={control} name="passwordcomfirm" type="password" label="Comfirm Password" />
            <Button type="submit" variant="contained" color="secondary" sx={{ marginY: '16px', width: '100%' }}>
              {isSubmitting && <CircularProgress size={20} color="error" />}
              &nbsp; Save Change
            </Button>
          </Paper>
        </form>
      </Box>
    </Box>
  );
}
