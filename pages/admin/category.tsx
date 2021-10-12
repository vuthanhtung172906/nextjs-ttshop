import { yupResolver } from '@hookform/resolvers/yup';
import { Delete, Edit } from '@mui/icons-material';
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import categoryApi from '../../api/axiosCategory';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import AdminSidebar from '../../components/common/AdminSiderbar';
import InputField from '../../components/FormField/InputField';
import { categoryAction } from '../../features/category/categorySlice';
export interface CategoryListProps {}
interface NewCate {
  category: string;
  [key: string]: any;
}
export default function CategoryList(props: CategoryListProps) {
  const categorylist = useAppSelector((state) => state.category.categorylist);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(categoryAction.getCategory());
  }, [dispatch]);
  const schemaValidate = yup.object().shape({
    category: yup.string().test('name-existed', 'Vui lòng chọn tên khác ', (value) => {
      for (let i of categorylist) {
        if (i.name === value) {
          return false;
        }
      }
      return true;
    }),
  });
  const initialValue: NewCate = {
    category: '',
  };
  const [editId, setEditId] = useState<any>(null);
  const isEdit = Boolean(editId);
  const { control, handleSubmit, reset, setFocus, setValue } = useForm<any>({
    mode: 'onSubmit',
    defaultValues: initialValue,
    resolver: yupResolver(schemaValidate),
  });
  const handleSubmitCate = async (formvalue: NewCate) => {
    try {
      if (!isEdit) {
        const res = await categoryApi.create(formvalue.category);
        console.log(res);
        dispatch(categoryAction.getCategory());
        reset(initialValue);
      } else {
        const res = await categoryApi.update(formvalue.category, editId as string);
        dispatch(categoryAction.getCategory());
        setEditId(null);
        reset(initialValue);
      }
    } catch (error) {
      throw error;
    }
  };
  const handleEdit = async (state: any) => {
    try {
      setFocus('category' as never);
      setValue('category', state.name);
      setEditId(state._id);
    } catch (error) {
      throw error;
    }
  };
  const handleDelete = async (state: any) => {
    try {
      await categoryApi.delete(state._id);
      dispatch(categoryAction.getCategory());
    } catch (error) {
      throw error;
    }
  };
  return (
    <Box display="flex" padding="10px" sx={{ backgroundColor: '#F3F4F6' }}>
      <AdminSidebar />
      <Paper
        sx={{
          flex: '1',
          margin: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box minWidth="400px">
          <form onSubmit={handleSubmit(handleSubmitCate)}>
            <InputField control={control} name="category" label="Tạo danh mục mới" type="text" />
          </form>
        </Box>

        <Box sx={{ minWidth: '500px', marginY: '20px' }}>
          {categorylist?.map((state, idx) => (
            <Paper
              elevation={4}
              key={idx}
              sx={{
                margin: '10px',
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography>{state.name}</Typography>
              <Box>
                <Edit sx={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => handleEdit(state)} />
                <Delete sx={{ cursor: 'pointer' }} onClick={() => handleDelete(state)} />
              </Box>
            </Paper>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
