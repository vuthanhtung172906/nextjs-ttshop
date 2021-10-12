import { Box } from '@mui/system';
import Image from 'next/image';
import * as React from 'react';
import Slider from 'react-slick';
import slider1 from './SliderImage/slider1.jpg';
import slider2 from './SliderImage/slider2.jpg';
import slider3 from './SliderImage/slider3.jpg';
import slider4 from './SliderImage/slider4.jpg';
import slider5 from './SliderImage/slider5.jpg';
export interface SliderProps {}

export default function Sliders(props: SliderProps) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    appendDots: (dots: any) => (
      <div
        style={{
          borderRadius: '10px',
          padding: '10px',
        }}
      >
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
    // customPaging: (i: any) => (
    //   <div
    //     style={{
    //       width: '30px',
    //       color: '#111',
    //       border: '1px #111 solid',
    //       borderRadius: '30px',
    //     }}
    //   >
    //     {i + 1}
    //   </div>
    // ),
  };
  return (
    <Box height="420px" width="1536px" marginX="auto">
      <Slider ref={(slider) => slider?.slickPlay()} {...settings}>
        <Box sx={{ position: 'relative', width: '1536px', height: '400px' }}>
          <Image src={slider1} alt="123" layout="fill" objectFit="cover" />
          {/* <Box
            sx={{
              position: 'absolute',
              width: '100% ',
              height: '100%',
              bottom: '0',
              boxShadow: 'inset 0px -100px 100px 1px rgba(255,255,255,0.52)',
            }}
          ></Box> */}
        </Box>
        <Box sx={{ position: 'relative', width: '1536px', height: '400px' }}>
          <Image src={slider2} alt="123" layout="fill" objectFit="cover" />
          {/* <Box
            sx={{
              position: 'absolute',
              width: '100% ',
              height: '100%',
              bottom: '0',
              boxShadow: 'inset 0px -100px 100px 1px rgba(255,255,255,0.52)',
            }}
          ></Box> */}
        </Box>
        <Box sx={{ position: 'relative', width: '1536px', height: '400px' }}>
          <Image src={slider3} alt="123" layout="fill" objectFit="cover" />
          {/* <Box
            sx={{
              position: 'absolute',
              width: '100% ',
              height: '100%',
              bottom: '0',
              boxShadow: 'inset 0px -100px 100px 1px rgba(255,255,255,0.52)',
            }}
          ></Box> */}
        </Box>
        <Box sx={{ position: 'relative', width: '1536px', height: '400px' }}>
          <Image src={slider4} alt="123" layout="fill" objectFit="cover" />
          {/* <Box
            sx={{
              position: 'absolute',
              width: '100% ',
              height: '100%',
              bottom: '0',
              boxShadow: 'inset 0px -100px 100px 1px rgba(255,255,255,0.52)',
            }}
          ></Box> */}
        </Box>
        <Box sx={{ position: 'relative', width: '1536px', height: '400px' }}>
          <Image src={slider5} alt="123" layout="fill" objectFit="cover" />
          {/* <Box
            sx={{
              position: 'absolute',
              width: '100% ',
              height: '100%',
              bottom: '0',
              boxShadow: 'inset 0px -100px 100px 1px rgba(255,255,255,0.52)',
            }}
          ></Box> */}
        </Box>
      </Slider>
    </Box>
  );
}
