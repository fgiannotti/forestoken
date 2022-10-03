import { FC } from 'react';
import { Link } from 'theme-ui';
import { ThemeProvider } from 'theme-ui';
import theme from 'src/client/theme/themeLanding';

const LOGIN_DATA = {
  button: {
    link: '/home',
    label: 'INGRESAR',
  },
};
const Index: FC = () => {
  const { button } = LOGIN_DATA;
  return (
    <ThemeProvider theme={theme}>
      <h1>Login Page</h1>
      <Link href={button.link} sx={styles.btn}>
        {button.label}
      </Link>
    </ThemeProvider>
  );
};

export default Index;

const styles = {
  btn: {
    backgroundColor: 'heading_secondary',
    borderRadius: '7px',
    lineHeight: 1,
    fontSize: ['13px', '14px', '15px'],
    padding: ['14px 20px 13px', '14px 25px 13px', '17px 30px 15px'],
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    color: '#ffffff',
    transition: 'all 300ms ease',
    '&:hover': {
      opacity: 0.8,
    },
  },
};
