import { Button, Pagination, Paper, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, styled } from '@mui/system';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import AdminSidebar from '../../components/common/AdminSiderbar';
import { productAction } from '../../features/products/productSlice';
import Image from 'next/image';
import ProductFilter from '../../features/products/Components/ProductFilter';
import { ImageType, IProduct, IProductParams } from '../../types';
import { categoryAction } from '../../features/category/categorySlice';
import productApi from '../../api/axiosProduct';
import { useRouter } from 'next/router';
import uploadApi from '../../api/UploadApi';
const Description = styled(Typography)`
  font-size: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
export default function ProductList() {
  const dispatch = useAppDispatch();
  const productstate = useAppSelector((state) => state.product);
  const categorylist = useAppSelector((state) => state.category.categorylist);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        dispatch(productAction.getProductList(productstate.filter));
        dispatch(categoryAction.getCategory());
      } catch (error) {
        throw error;
      }
    })();
  }, [dispatch, productstate.filter]);
  const changePagination = (event: any, page: number) => {
    dispatch(
      productAction.setFilter({
        ...productstate.filter,
        page: page,
      })
    );
  };
  const onSearchChange = (newFilter: IProductParams) => {
    dispatch(productAction.setFilterDebounce(newFilter));
  };
  const handleChangeSort = (newFilter: IProductParams) => {
    dispatch(productAction.setFilter(newFilter));
  };
  const handleDelete = async (productId: IProduct) => {
    const newarray = productId.images.map((state) => {
      return state.public_id;
    });
    await productApi.delete(productId._id as string);
    await uploadApi.deleteImg(newarray);
    dispatch(productAction.setFilter({ ...productstate.filter }));
  };
  const handleEdit = (productId: string) => {
    router.push(`/admin/addedit?id=${productId}`);
  };
  return (
    <Box display="flex" padding="10px" sx={{ backgroundColor: '#F3F4F6' }}>
      <AdminSidebar />

      <Paper sx={{ flex: '1', margin: '8px' }}>
        <ProductFilter
          filterParams={productstate.filter}
          onSearchChange={onSearchChange}
          categorylist={categorylist}
          onChangeSort={handleChangeSort}
        />
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Title</TableCell>

                <TableCell align="left">Price&nbsp;(vnd)</TableCell>
                <TableCell align="left">Mô tả</TableCell>
                <TableCell align="left">Kho</TableCell>
                <TableCell align="left">Đã bán</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productstate.products.map((row) => (
                <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row._id}
                  </TableCell>
                  <TableCell align="left">
                    <Box sx={{ position: 'relative', width: '100px', height: '100px' }}>
                      <Image src={row.images[0].url as string} alt={row.content} layout="fill" objectFit="contain" />
                    </Box>
                  </TableCell>

                  <TableCell align="left">{row.category}</TableCell>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="left">{row.price}</TableCell>
                  <TableCell align="left" sx={{ maxWidth: '400px' }}>
                    <Description>{row.content}</Description>
                  </TableCell>
                  <TableCell align="left">{row.inStock}</TableCell>
                  <TableCell align="left">{row.sold}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleEdit(row._id as string)}>Edit</Button>
                    <Button onClick={() => handleDelete(row)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          sx={{ marginY: '20px', display: 'flex', justifyContent: 'center' }}
          count={Math.ceil(productstate.pagination?._totalCount / productstate.pagination?._limit)}
          color="primary"
          onChange={changePagination}
        />
      </Paper>
    </Box>
  );
}
