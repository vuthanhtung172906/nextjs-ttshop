import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import useMediaQuery from '@mui/material/useMediaQuery';
import json2mq from 'json2mq';
import { styled } from '@mui/system';
import { useRouter } from 'next/router';

function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}
const ImgCateItem = styled(ImageListItem)`
  transition: transform 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.01);
  }
`;
export default function CustomImageList() {
  const matches = useMediaQuery(
    json2mq({
      maxWidth: 600,
    })
  );
  const [items, setItems] = React.useState([
    [2, 2],
    [1, 1],
    [1, 1],
    [1, 2],
  ]);
  React.useEffect(() => {
    if (matches) {
      console.log('Vaads');
      setItems([
        [2, 2],
        [2, 2],
        [2, 2],
        [2, 2],
      ]);
    } else {
      setItems([
        [2, 2],
        [1, 1],
        [1, 1],
        [1, 2],
      ]);
    }
  }, [matches]);
  const router = useRouter();
  const clickSamsung = () => {
    router.push('/search?category=616015783571895a5a3a2faa');
  };
  const clickIphone = () => {
    router.push('/search?category=616015ee3571895a5a3a2fb0');
  };
  const clickXiaomi = () => {
    router.push('/search?category=6163ff30ceb9c502d8b099ba');
  };
  const clickRealmi = () => {
    router.push('/search?category=6164019bceb9c502d8b099f1');
  };
  return (
    <ImageList
      sx={{
        width: '100%',
        margin: '10px',
        padding: '24px',
        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
        transform: 'translateZ(0)',
      }}
      cols={4}
      gap={1}
    >
      <ImgCateItem cols={items[0][1]} rows={items[0][0]} onClick={clickSamsung}>
        <img {...srcset(itemData[0].img, 250, 200, items[0][0], items[0][1])} alt={'Item product'} loading="lazy" />
        <ImageListItemBar
          sx={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
          }}
          title={itemData[0].title}
          position="top"
          actionIcon={
            <IconButton sx={{ color: 'white' }} aria-label={`star ${itemData[0].title}`}>
              <StarBorderIcon />
            </IconButton>
          }
          actionPosition="left"
        />
      </ImgCateItem>
      <ImgCateItem cols={items[1][1]} rows={items[1][0]} onClick={clickIphone}>
        <img {...srcset(itemData[1].img, 250, 200, items[1][0], items[1][1])} alt={'Item product'} loading="lazy" />
        <ImageListItemBar
          sx={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
          }}
          title={itemData[1].title}
          position="top"
          actionIcon={
            <IconButton sx={{ color: 'white' }} aria-label={`star ${itemData[0].title}`}>
              <StarBorderIcon />
            </IconButton>
          }
          actionPosition="left"
        />
      </ImgCateItem>
      <ImgCateItem cols={items[2][1]} rows={items[2][0]} onClick={clickXiaomi}>
        <img {...srcset(itemData[2].img, 250, 200, items[2][0], items[2][1])} alt={'Item product'} loading="lazy" />
        <ImageListItemBar
          sx={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
          }}
          title={itemData[2].title}
          position="top"
          actionIcon={
            <IconButton sx={{ color: 'white' }} aria-label={`star ${itemData[0].title}`}>
              <StarBorderIcon />
            </IconButton>
          }
          actionPosition="left"
        />
      </ImgCateItem>
      <ImgCateItem cols={items[3][1]} rows={items[3][0]} onClick={clickRealmi}>
        <img {...srcset(itemData[3].img, 250, 200, items[3][0], items[3][1])} alt={'Item product'} loading="lazy" />
        <ImageListItemBar
          sx={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
          }}
          title={itemData[3].title}
          position="top"
          actionIcon={
            <IconButton sx={{ color: 'white' }} aria-label={`star ${itemData[0].title}`}>
              <StarBorderIcon />
            </IconButton>
          }
          actionPosition="left"
        />
      </ImgCateItem>
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://res.cloudinary.com/tungvuthanh20172906/image/upload/v1633944773/user/dien-thoai-samsung_y7c1nt.jpg',
    title: 'Samsung',
  },
  {
    img: 'https://res.cloudinary.com/tungvuthanh20172906/image/upload/v1633944774/user/iphone-13-promax-4437-1632735850_kqi4lh.jpg',
    title: 'Iphone',
  },
  {
    img: 'https://res.cloudinary.com/tungvuthanh20172906/image/upload/v1633944774/user/xiaomi-redmi-note-10s-xanh-duong-1-org_q0krbn.jpg',
    title: 'Xiaomi',
  },
  {
    img: 'https://res.cloudinary.com/tungvuthanh20172906/image/upload/v1633944774/user/realme-c21y-xanh-1-org_zzr3px.jpg',
    title: 'Realmi',
  },
];
