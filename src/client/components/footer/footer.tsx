/** @jsxImportSource theme-ui */
import { jsx, Container, Box, Flex, Heading, Link } from 'theme-ui';
import Copyright from '../copyright';

import FOOTER_DATA from './footer.data';

const Footer = () => {
  return (
    <Box as="footer" sx={styles.footer}>
      <Container>
        <Flex sx={styles.row}>
          {FOOTER_DATA.map(({ title, menuItem }, index) => (
            <Box sx={styles.widget} key={`footer-widget-key-${index}`}>
              <Heading as="h2">{title}</Heading>
              <ul>
                {menuItem.map(({ link, label }, index) => (
                  <li key={`footer-menu-item-key-${index}`}>
                    <Link href={link}>{label}</Link>
                  </li>
                ))}
              </ul>
            </Box>
          ))}
        </Flex>
      </Container>
      <Copyright sx={styles.copy}/>
    </Box>
  );
};

export default Footer;

const styles = {
  footer: {
    pt: ['65px', null, '75px', null, '90px'],
    pb: ['30px', null, '45px', '30px', '110px'],
    backgroundColor: 'background',
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    px: [0, null, null, '40px', 0, '60px'],
  },
  widget: {
    flex: ['0 0 50%', null, '0 0 33.33%', null, '0 0 25%'],
    mb: ['33px', null, null, '45px', 0],
    textAlign: 'center',
    h2: {
      m: 0,
      lineHeight: 1.35,
      fontSize: ['17px', null, '18px'],
      letterSpacing: '-0.5px',
      color: 'heading',
      fontWeight: 500,
    },
    ul: {
      m: 0,
      p: 0,
      listStyle: 'none',
      mt: ['20px', null, null, '25px', '30px'],
      li: {
        mt: ['10px', null, '12px'],
      },
      a: {
        display: 'block',
        color: '#02073E',
        opacity: 0.8,
        fontSize: '14px',
        lineHeight: 1.5,
        transition: 'all 500ms ease',
        '&:hover': {
          opacity: 1,
        },
      },
    },
  },
  copy: {
    borderTop: '1px solid #E6E6E6',
    pt: '30px',
    mt: '30px',
    opacity: 0.8,
    a: {
      color: 'primary',
      textDecoration: 'none',
      ml: '5px',
    },
  },
};
