import { Box, styled } from '@mui/system';
import * as React from 'react';
import { IProduct } from '../../types';
import Image from 'next/image';
import { Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
export interface ProductCardProps {
  product: IProduct;
}
const PaperImage = styled(Paper)`
  cursor: pointer;
  transition: all 0.2s 0s ease;
  &:hover {
    transform: translateY(-10px);
  }
`;
const DisplayPrice = styled(Typography)`
  font-size: 18px;
  position: relative;
  font-weight: bold;
  color: #dc2626;
  &::after {
    padding-left: 5px;
    content: '₫';
    position: absolute;
    top: 1px;
    font-size: 14px;
  }
`;
const Description = styled(Typography)`
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const handleClick = (id: string) => {
    router.push(`/product/${id}`);
  };
  return (
    <PaperImage
      onClick={() => handleClick(product._id as string)}
      sx={{ width: '100%', display: 'flex', flexFlow: 'column nowrap', padding: '20px' ,alignItems:'center'}}
      elevation={2}
    >
      <Box sx={{ width: '251px', height: '251px', position: 'relative',display:'flex' }}>
        <Image src={product.images[0].url} layout="fill" objectFit="contain" alt={product.title} />
      </Box>
      <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <Typography sx={{ textTransform: 'capitalize', fontSize: '20px', marginY: '16px' }}>{product.title}</Typography>
      <Description>{product.description}</Description>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginY: '8px', width:'100%' }}>
        <DisplayPrice>{product.price}</DisplayPrice>
        <Typography sx={{ color: '#3b82f6', fontSize: '18px' }}>Đã bán: {product.sold}</Typography>
      </Box>
      </Box>

    </PaperImage>
  );
}
