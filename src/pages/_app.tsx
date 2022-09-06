// ./src/pages/_app.tsx
import '../client/styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import NextApp, { AppProps } from 'next/app';
import { AppDataContext } from 'src/client/ssr/appData';
import { AppData } from 'src/shared/types/app-data';
import { initializeFetch } from 'src/shared/utils/fetch';
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
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from 'src/client/theme/theme';
import createEmotionCache from 'src/client/theme/createEmotionCache';
import { useEffect } from 'react';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

class App extends NextApp<AppProps> {
  appData: AppData;

  constructor(props: AppProps) {
    super(props);

    this.appData = props.pageProps.appData || {};

    initializeFetch(this.appData.basePath);
  }

  render() {
    const {
      Component,
      emotionCache = clientSideEmotionCache,
      pageProps,
    } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    /*
    useEffect(() => {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles) {
        jssStyles?.parentElement?.removeChild(jssStyles);
      }
    }, []);
    */

    return (
      <AppDataContext.Provider value={this.appData}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
          </Head>
          <ThemeProvider theme={theme}>
            <AnimatePresence exitBeforeEnter>
              <Layout>
                <CssBaseline />
                <Component {...pageProps} />
              </Layout>
            </AnimatePresence>
          </ThemeProvider>
        </CacheProvider>
      </AppDataContext.Provider>
    );
  }
}

export default App;
