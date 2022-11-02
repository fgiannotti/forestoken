import Image from 'next/image';
import { Box, Container, Flex, Link, Text, Heading } from 'theme-ui';
import CountDown from 'react-countdown';
import image from 'src/client/assets/Forestokenpana.png';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const deadline = new Date('01/01/2023'); // fecha de lanzamiento del proyecto.
const COUNTDOWN_DATA = {
  title: '¿Qué esperas para empezar a tokenizar?',
  text: 'Registrate en nuestra aplicación, tokenizá tu madera de pino y empezá a usar los criptopinos para lo que quieras.',
  subtitle: 'Fecha de lanzamiento:',
  image: image,
};

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <Text>Times Up!</Text>;
  } else {
    return (
      <Box sx={styles.timerWrap}>
        <Box sx={styles.timer}>
          <Text as="span">{days}</Text>
          <Heading as="h3">Dias</Heading>
        </Box>
        <Box sx={styles.timer}>
          <Text as="span">{hours}</Text>
          <Heading as="h3">Horas</Heading>
        </Box>
        <Box sx={styles.timer}>
          <Text as="span">{minutes}</Text>
          <Heading as="h3">Mi</Heading>
        </Box>
        <Box sx={styles.timer}>
          <Text as="span">{seconds}</Text>
          <Heading as="h3">Seconds</Heading>
        </Box>
      </Box>
    );
  }
};
const CountDownBlock = () => {
  const { title, text, subtitle, image } = COUNTDOWN_DATA;
  return (
    <Box as="section" sx={styles.section}>
      <Container sx={styles.container}>
        <Flex sx={styles.row}>
          <Box sx={styles.content}>
            <Heading as="h2">{title}</Heading>
            <Text as="p">{text}</Text>
            <Heading as="h4">{subtitle}</Heading>
            <CountDown date={deadline} renderer={renderer} />
          </Box>
          <Box sx={styles.image}>
            <Image src={image} alt="image" width={756} height={756} />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default CountDownBlock;

const styles = {
  section: {
    pb: ['55px', '65px', null, '90px', '110px', null, '130px', '140px'],
  },
  container: {
    position: 'relative' as const,
  },
  row: {
    flexWrap: 'wrap' as const,
    alignItems: 'center',
  },
  content: {
    maxWidth: ['520px', null, null, '345px', '380px', '440px', '520px'],
    textAlign: ['center', null, null, 'left'] as ['center', null, null, 'left'],
    mx: [null, 'auto', null, 0],
    h2: {
      fontSize: ['24px', '28px', '32px', null, '36px', '40px', '44px', '48px'],
      lineHeight: [1.4, null, 1.35, null, null, 1.46],
      color: 'heading',
      letterSpacing: '-1px',
      fontWeight: 'body',
      mt: [0, null, null, null, null, null, '-15px'],
    },
    p: {
      color: 'body',
      fontSize: ['15px', null, '16px'],
      lineHeight: [1.9, null, 2.12, null, 2.45],
      mt: ['12px', null, '15px', null, '20px', null, '25px'],
    },
    h4: {
      color: '#8075FF',
      lineHeight: [1, null, 2, null, null, 3],
      fontWeight: 'body',
      mt: ['12px', null, '15px', null, '20px', null, '25px'],
    },
  },
  image: {
    mt: ['45px', null, '50px', 0],
    width: [
      '100%',
      null,
      null,
      'calc(100% - 345px)',
      'calc(100% - 380px)',
      'calc(100% - 440px)',
      'calc(100% - 520px)',
    ],
    textAlign: ['center'] as ['center'],
    pl: [null, null, null, '30px', '70px', null, '50px'],
    img: {
      display: 'flex',
    },
  },
  timerWrap: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: ['center', null, null, 'left'],
    ml: ['-30px', null, '-40px'],
  },
  timer: {
    flex: '0 0 auto',
    ml: ['30px', null, '40px'],
    span: {
      lineHeight: 1,
      fontSize: ['22px', null, '28px', '32px', '36px'],
      letterSpacing: '-1px',
      fontWeight: 600,
      color: 'body',
    },
    h3: {
      lineHeight: 1.3,
      color: 'heading',
      fontSize: ['14px', '15px'],
      fontWeight: 'body',
      mt: '5px',
    },
  },
  button: {
    backgroundColor: 'heading_secondary',
    borderRadius: '5px',
    fontSize: ['13px', '14px', '15px'],
    padding: ['14px 20px 13px', '14px 25px 13px', '17px 30px 15px'],
    lineHeight: 1,
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    textTransform: 'uppercase' as const,
    color: '#ffffff',
    mt: ['25px', '30px', '35px', '30px', '40px'],
    transition: 'all 300ms ease',
    '&:hover': {
      opacity: 0.8,
    },
  },
};
