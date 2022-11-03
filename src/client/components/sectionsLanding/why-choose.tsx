import React from 'react';
import { Container, Box, Flex, Heading, Text } from 'theme-ui';
import icon1 from 'src/client/assets/Wallet.svg';
import icon2 from 'src/client/assets/Transferencia.svg';
import icon3 from 'src/client/assets/Liquidez.svg';
import icon4 from 'src/client/assets/Seguridad.svg';
import Image from 'next/image';
const WHY_CHOOSE_DATA = {
  blockTitle: {
    title: '¿Por qué elegir Forestoken?',
    text: '',
  },
  posts: [
    {
      icon: icon1,
      title: 'Diversificación de tu cartera',
      text: 'Diversificá tu cartera invertiendo y siendo copropietarios de múltiples activos a la vez.',
    },
    {
      icon: icon2,
      title: 'Facilidad de transferencia',
      text: 'Los tokens mejoran la liquidez de los activos, reducen las barreras territoriales y atraen a nuevos Inversores a través de la propiedad fraccionada.',
    },
    {
      icon: icon3,
      title: 'Liquidez',
      text: 'Los Inversores pueden negociar activos del mundo real que, debido a su baja liquidez, habrían sido difíciles de intercambiar en el pasado.',
    },
    {
      icon: icon4,
      title: 'Transacciones seguras',
      text: 'Aprovecha las ventajas de la tecnología blockchain, como la inmutabilidad y la posibilidad de auditarlo en tiempo real.',
    },
  ],
};

const WhyChoose = () => {
  const { blockTitle, posts } = WHY_CHOOSE_DATA;
  return (
    <Box as="section" id="services" sx={styles.section}>
      <Container sx={styles.container}>
        <Box sx={styles.blockTitle}>
          <Heading as="h2">{blockTitle.title}</Heading>
          <Text as="p">{blockTitle.text}</Text>
        </Box>
        <Flex sx={styles.row}>
          {posts.map(({ icon, text, title }, index) => (
            <Box key={`why-choose-post-key-${index}`} sx={styles.post}>
              <Box sx={styles.imageWrap}>
                <Image src={icon} alt="icon image" />
              </Box>

              <Heading as="h3">{title}</Heading>
              <Text as="p">{text}</Text>
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default WhyChoose;

const styles = {
  section: {
    pb: ['20px', '30px', null, '50px', '85px', null, '105px', '125px', '140px'],
  },
  container: {
    position: 'relative' as const,
  },
  blockTitle: {
    textAlign: 'center' as const,
    mb: ['35px', null, null, '55px', null, '60px', '85px', '95px', '110px'],
    h2: {
      fontSize: ['24px', null, '28px', '30px'],
      lineHeight: [1.35],
      color: 'heading',
      mb: [2, null, '13px'],
      fontWeight: 'body',
    },
    p: {
      fontSize: ['15px', null, '16px'],
      lineHeight: 1.85,
      color: 'text_secondary',
    },
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 0,
  },
  post: {
    flex: ['0 0 100%', null, '0 0 50%', null, '0 0 25%'],
    textAlign: 'center' as const,
    alignItems: 'center',
    justifyContent: 'center',
    h3: {
      fontSize: ['18px', null, null, null, null, '20px'],
      lineHeight: 1.45,
      letterSpacing: '-0.5px',
      fontWeight: '500',
      color: '#8075FF',
      mt: ['18px', '20px', null, null, '25px', '30px', null, '40px'],
      mb: ['10px', '15px', null, null, null, '20px'],
    },
    p: {
      maxWidth: '242px',
      mx: ['auto', '30px'],
      color: '#02073E',
      fontSize: ['14px', '15px'],
      lineHeight: 2,
      textAlign: 'justify' as const,
    },
  },
  imageWrap: {
    display: 'flex',
    minHeight: ['auto', '83px'],
    alignItems: 'center',
    justifyContent: 'center',
    img: {
      width: ['75px', null, null, null, 'auto'],
    },
  },
};
