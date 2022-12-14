import React from 'react';
import Image from 'next/image';
import { Container, Box, Heading, Text, Link } from 'theme-ui';
import { IoIosPlayCircle } from 'react-icons/io';
import BannerImage from 'src/client/assets/Arbol moneda.png';

const BANNER_DATA = {
  title:
    'Conocé la nueva forma de participar en el negocio de producción forestal',
  text: 'A partir de la tecnología que brinda la blockchain, te invitamos a participar del negocio de producción forestal. Tokenizá tu madera y entrá en el mundo de la economía digital, vendiendo Criptopinos para comprar los insumos necesarios.',
  button: {
    link: '/auth/google/redirect',
    label: 'Ingresa',
  },
  videoBtn: {
    // link:'/WhitePaper',
    link: 'https://drive.google.com/file/d/1laAkL0xIfIZJ0xeW3lLhGHWUxk85869s/view?usp=sharing',
    label: 'White paper',
  },
  bannerImage: BannerImage,
};

const Banner = () => {
  const { title, text, button, videoBtn, bannerImage } = BANNER_DATA;
  return (
    <Box as="section" id="banner" sx={styles.section}>
      <Container sx={styles.container}>
        <Box sx={styles.content}>
          <Heading as="h1">{title}</Heading>
          <Text as="p">{text}</Text>
          <Box sx={styles.btnWrap}>
            <Link href={button.link} sx={styles.btn}>
              {button.label}
            </Link>

            <>
              <Link href={videoBtn.link} target={'_blank'} sx={styles.videoBtn}>
                {videoBtn.label}
                <IoIosPlayCircle />
              </Link>
            </>
          </Box>
        </Box>

        <Box sx={styles.sectionImage}>
          <Image
            src={bannerImage}
            alt="Banner Mockup"
            width={803}
            height={605}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;

const styles = {
  section: {
    pt: ['115px', null, null, '140px', '150px', '170px', '185px'],
    pb: ['60px', '75px', null, '90px', '110px', '120px', '140px', '160px'],
  },
  container: {
    position: 'relative' as const,
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    flexDirection: ['column', null, null, 'row'] as [
      'column',
      null,
      null,
      'row',
    ],
  },
  content: {
    maxWidth: ['100%', null, null, '355px', '460px', '545px', null, '590px'],
    textAlign: ['center', null, null, 'left'] as ['center', null, null, 'left'],
    h1: {
      fontSize: ['28px', '32px', null, '34px', '40px', '48px', '54px', '58px'],
      lineHeight: [1.4, null, null, 1.35],
      color: 'heading',
      fontFamily: 'archivo',
      letterSpacing: '-1.5px',
      fontWeight: 'body',
      mx: ['0', null, null, 'auto', '0'],
    },
    p: {
      fontSize: ['15px', null, null, null, '16px', '17px'],
      lineHeight: [1.85, null, 1.9, null, 2, 2.47],
      color: 'text',
      mt: [3, null, null, '18px'],
      pr: [0, null, null, null, null, null, null, '50px'],
    },
  },
  btnWrap: {
    display: 'flex',
    alignItems: 'center',
    mt: ['25px', null, null, '30px', '35px', '50px'],
    justifyContent: ['center', null, null, 'flex-start'],
  },
  btn: {
    backgroundColor: 'heading_secondary',
    borderRadius: '7px',
    lineHeight: 1,
    fontSize: ['13px', '14px', '15px'],
    padding: ['14px 20px 13px', '14px 25px 13px', '17px 30px 15px'],
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    textTransform: 'uppercase' as const,
    color: '#ffffff',
    transition: 'all 300ms ease',
    '&:hover': {
      opacity: 0.8,
    },
  },
  videoBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    color: 'heading_secondary',
    cursor: 'pointer',
    textTransform: 'uppercase' as const,
    padding: 0,
    fontSize: ['13px', null, '15px', null, '17px'],
    fontWeight: 700,
    fontFamily: 'body',
    ml: ['20px', null, null, '25px', '30px'],
    outline: 'none',
    svg: {
      ml: [1, null, 2],
      fontSize: ['17px', '18px', '20px'],
      position: 'relative' as const,
      top: '-1px',
    },
  },
  sectionImage: {
    mt: ['40px', null, null, 0],
    pl: [0, null, null, '30px', 0],
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative' as const,
    right: ['auto', null, null, null, '-10px', '-50px', '-70px'],
    width: [
      null,
      null,
      null,
      'calc(100% - 355px)',
      'calc(100% - 460px)',
      'calc(100% - 545px)',
      null,
      'calc(100% - 590px)',
    ],
    textAlign: ['center', null] as ['center', null],
  },
};
