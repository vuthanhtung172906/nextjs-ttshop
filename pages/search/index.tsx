import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import categoryApi from '../../api/axiosCategory';
import productApi from '../../api/axiosProduct';
import Sidebar from '../../components/common/SideBar';
import Layout from '../../components/Layout';
import ProductCard from '../../components/Product/ProductCard';
import { ICategory, IProduct, IProductParams, IProductResponse } from '../../types';

export interface SearchPageProps {
  productlist: IProductResponse;
  categorylist: ICategory[];
}
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default function SearchPage({ productlist, categorylist }: SearchPageProps) {
  const [filter, setfilter] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setfilter(event.target.value as string);
  };
  const [productsort, setProductSort] = useState([] as IProduct[]);
  const router = useRouter();
  const query = router.query;
  const [openSidebar, setSiderbar] = useState(false);
  useEffect(() => {
    if (filter) {
      (async () => {
        try {
          const queryParams = {
            ...query,
            sort: filter,
          };
          const productlist = await productApi.getProduct(queryParams as IProductParams);
          setProductSort(productlist.products);
        } catch (error) {
          throw error;
        }
      })();
    }
  }, [filter, query]);
  const changePagination = async (event: any, page: number) => {
    try {
      const newquery: IProductParams = {
        ...query,
        page: page,
      };
      const productlist2 = await productApi.getProduct(newquery);
      setProductSort(productlist2.products);
    } catch (error) {
      throw error;
    }
  };
  const products = productsort.length === 0 ? productlist.products : productsort;
  return (
    <Layout>
      <Paper elevation={2}>
        <Box
          sx={{
            display: 'flex',
            padding: '8px',
            marginBottom: '16px',
            marginX: 'auto',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1536px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Typography>
              Kết quả tìm kiếm: {productlist.pagination._limit} / {productlist.pagination._totalCount}
            </Typography>
            <IconButton onClick={() => setSiderbar(true)} sx={{ display: { xs: 'block', md: 'none' } }}>
              <FilterAltIcon fontSize="medium" />
            </IconButton>
          </Box>

          <Box minWidth="150px" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FormControl fullWidth>
              <InputLabel id="selectform">Sắp xếp theo</InputLabel>
              <Select labelId="selectform" value={filter} variant="standard" onChange={handleChange}>
                <MenuItem value={'createdAt'}>Mới nhất</MenuItem>
                <MenuItem value={'-sold'}>Bán chạy nhất</MenuItem>
                <MenuItem value={'-createdAt'}>Cũ nhất</MenuItem>
                <MenuItem value={'price'}>Giá: Tăng giần</MenuItem>
                <MenuItem value={'-price'}>Giá: Giảm giần</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Paper>
      <Box maxWidth="1536px" margin="0px auto" sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box
          maxWidth="256px"
          minWidth="200px"
          sx={{ borderRight: '4px solid #E5E7EB', display: { xs: 'none', md: 'block' } }}
        >
          <Sidebar openSidebar={openSidebar} closeDrawer={() => setSiderbar(false)} categorylist={categorylist} />
          <Divider />
          <Accordion sx={{ boxShadow: 'none', border: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Giá</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                <FormControlLabel control={<Checkbox size="small" />} label="Dưới 100.000đ" />
                <FormControlLabel control={<Checkbox size="small" />} label="Từ 100.000đ - 199.000đ" />
                <FormControlLabel control={<Checkbox size="small" />} label="Từ 200.000đ - 299.000đ" />
                <FormControlLabel control={<Checkbox size="small" />} label="Trên 300.000đ" />
              </FormGroup>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ boxShadow: 'none', border: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Màu sắc</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                <FormControlLabel control={<Checkbox size="small" />} label="Trắng" />
                <FormControlLabel control={<Checkbox size="small" />} label="Xanh " sx={{ color: '#4EACBD' }} />
                <FormControlLabel control={<Checkbox size="small" />} label="Đen" sx={{ color: '#0e960a' }} />
                <FormControlLabel control={<Checkbox size="small" />} label="Vàng" sx={{ color: '#1c34a0' }} />
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box>
          <Grid container columns={{ xs: 13, sm: 13, md: 13, lg: 13 }}>
            {products?.map((state, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3} sx={{ marginX: '8px', marginBottom: '16px' }}>
                <ProductCard product={state} />
              </Grid>
            ))}
          </Grid>
          <Pagination
            sx={{ marginY: '20px', display: 'flex', justifyContent: 'center' }}
            count={Math.ceil(productlist.pagination?._totalCount / productlist.pagination?._limit)}
            color="primary"
            onChange={changePagination}
          />
        </Box>
      </Box>
    </Layout>
  );
}
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  context.res.setHeader('Cache-Control', 's-maxage=5 , stale-while-revalidate');
  const getProduct = await productApi.getProduct(context.query as IProductParams);
  const categorylist = await categoryApi.get();
  return {
    props: {
      productlist: getProduct,
      categorylist,
    },
  };
};
