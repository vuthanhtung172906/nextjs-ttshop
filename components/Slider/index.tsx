import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Button, useMediaQuery } from '@mui/material';
import { Box, styled } from '@mui/system';
import Image from 'next/image';
import * as React from 'react';
import sliderlist from './data.json'
export interface SliderProps {}


const Container = styled(Box)`
overflow: hidden;
    position: relative;
    margin:0px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1536px;
  margin-bottom: 20px;
`


export default function Sliders(props: SliderProps) {
  const [currentIndex , setCurrentIndex] = React.useState(0)
  const matches = useMediaQuery('(min-width:600px)');

  const handlePrevSlide = React.useCallback(()=> {
    setCurrentIndex(state=> (state-1 + sliderlist.length) % sliderlist.length)
  },[])
  const handleNextSlide = React.useCallback(()=>{
    setCurrentIndex(state=> (state + 1  ) % sliderlist.length)
  },[])
    React.useEffect(() => {
    const timeout = setTimeout(handleNextSlide, 2000)
    return () => clearTimeout(timeout)
  })

  return (
    <Container >
      {
        sliderlist.map((state, idx) => (
          <Box key={idx} height={matches?'400px':'200px'} sx={{position:'relative', minWidth:'100%'}} display={currentIndex===idx?'block' :'none'}>
            <Image src={state.banner} alt="banner-image" layout='fill' objectFit='cover' />
          </Box>
        ))
      }
      <Button sx={{position:'absolute' , top:"45%" , right:"0px" }}  onClick={handleNextSlide}>
      <ArrowForwardIos color='info' />
      </Button>
      <Button sx={{position:'absolute' , top:"45%" , left:"0px" }} onClick={handlePrevSlide}>
        <ArrowBackIos color='inherit' />
      </Button>

    </Container>
  );
}
