// ./src/pages/_app.tsx
import '../client/styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import NextApp, { AppProps } from 'next/app';
import '@fontsource/archivo';
import '@fontsource/archivo/600.css';
import '@fontsource/dm-sans';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';
import 'rc-drawer/assets/index.css';
import 'react-modal-video/css/modal-video.min.css';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'src/client/theme/theme';
import { UserProvider } from 'src/client/contexts/user/user.provider';

type Props = AppProps<{user: {name:string, image:string, user: string}}>;

class App extends NextApp<Props> {
  user: ({name:string, image:string, user: string});

  constructor(props: Props) {
    super(props);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.user = props.pageProps.user || null;
  }

  static async getInitialProps({ctx}) {
      const { userData } = ctx.req?.cookies || ctx.res?.cookies;
      let [, userId, , userImage, , userName] = userData
        ? userData.split('|')
        : [];
      if (!userId) {
        console.log('no se recibió la cookie');
      }
    
      return {
        pageProps: {
          user: {
            user: userId,
            name: userName,
            image: userImage,
          }
        }
      };
    }

  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component['layout'] ?? (({ children }) => <>{children}</>);

    return (
      <>
        <Head>
          <title>Forestoken</title>
          <link rel="icon" href="/logo.svg" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <UserProvider initialState={pageProps.user}>
            <AnimatePresence exitBeforeEnter>
              <Layout>
                <CssBaseline />
                <Component {...pageProps} />
              </Layout>
            </AnimatePresence>
          </UserProvider>
        </ThemeProvider>
      </>
    );
  }
}

export default App;