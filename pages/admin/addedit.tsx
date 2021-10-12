import { Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import productApi from '../../api/axiosProduct';
import uploadApi from '../../api/UploadApi';
import { useAppDispatch } from '../../app/hooks';
import AdminSidebar from '../../components/common/AdminSiderbar';
import { categoryAction } from '../../features/category/categorySlice';
import ProductForm from '../../features/products/Components/ProductForm';
import { IProduct } from '../../types';
export interface AddEditProps {}

export default function AddEdit(props: AddEditProps) {
  const [product, setProduct] = useState<Partial<IProduct>>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;
  const isEdit = Boolean(id);
  console.log({ isEdit });
  const [listimage, setListImage] = useState<any>([]);
  useEffect(() => {
    (async () => {
      try {
        dispatch(categoryAction.getCategory());
        if (isEdit) {
          const res = await productApi.getProductDetail(id as string);
          setProduct(res);
          setListImage([...res.images]);
        }
      } catch (error) {
        throw error;
      }
    })();
  }, [dispatch, id, isEdit]);
  const initialValue: Partial<IProduct> = {
    title: '',
    price: '',
    description: '',
    content: '',
    sold: '',
    category: '',
    inStock: '',
    capacity: [],
    color: [],
    ...product,
  };
  console.log({ initialValue });

  const [keyimg, setKeyImg] = useState(0);
  const chooseMultiImage = (event: any) => {
    const arrImgfile = Object.values(event.target.files);
    const arrImg = arrImgfile.map((state) => {
      return {
        file: state,
        url: URL.createObjectURL(state),
      };
    });
    setListImage([...arrImg]);
  };
  const handleChangeKeyImg = (idx: number) => {
    setKeyImg(idx);
  };
  const hanleSubmitForm = async (formvalue: Partial<IProduct>) => {
    if (isEdit) {
      if (listimage[0].file) {
        const formData = new FormData();
        listimage.map((state: any) => {
          formData.append('file', state.file);
        });
        const oldUrl = listimage.map((state: any) => {
          return state.public_id;
        });
        const res3 = await uploadApi.deleteImg(oldUrl);
        console.log({ res3 });
        const res = await uploadApi.uploadImg(formData);
        const res2 = await productApi.update({
          ...formvalue,
          images: res,
        });
      } else {
        const res2 = await productApi.update({
          ...formvalue,
          images: listimage,
        });
      }
      toast.success('Update product success');
      router.push('/admin/productlist');
    } else {
      const formData = new FormData();
      listimage.map((state: any) => {
        formData.append('file', state.file);
      });
      const res = await uploadApi.uploadImg(formData);
      const res2 = await productApi.create({
        title: formvalue.title,
        price: formvalue.price,
        sold: formvalue.sold,
        description: formvalue.description,
        content: formvalue.content,
        category: formvalue.category,
        inStock: formvalue.inStock,
        images: res,
        color: formvalue.color,
        capacity: formvalue.capacity,
      });
      toast.success('Create product success');
      router.push('/admin/productlist');
    }
  };
  console.log({ listimage });
  return (
    <Box display="flex" padding="10px" sx={{ backgroundColor: '#F3F4F6' }}>
      <AdminSidebar />
      <Grid container component={Paper} sx={{ flex: '1', margin: '8px', padding: '10px' }}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexFlow: 'column nowrap',
              padding: '10px',
            }}
          >
            <Box sx={{ position: 'relative', width: '100%', height: '100%', margin: '5px' }}>
              <Image
                src={listimage[keyimg]?.url || '/temp.jpg'}
                alt="productImagelist"
                layout="fill"
                objectFit="contain"
              />
              <input
                style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0 }}
                type="file"
                name="image"
                id="imaeg"
                accept="image/png, image/gif, image/jpeg"
                multiple
                onChange={chooseMultiImage}
              />
            </Box>
            <Box sx={{ display: 'flex', flexFlow: 'row nowrap' }}>
              {listimage.map((state: any, idx: any) => (
                <Box
                  key={idx}
                  sx={{ position: 'relative', width: '78px', height: '78px', margin: '5px' }}
                  onClick={() => handleChangeKeyImg(idx)}
                >
                  <Image src={state.url} alt="productimg" layout="fill" objectFit="contain" />
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ paddingLeft: '20px' }}>
          {(!isEdit || Boolean(product)) && <ProductForm initialValue={initialValue} onSubmit={hanleSubmitForm} />}
        </Grid>
      </Grid>
    </Box>
  );
}
