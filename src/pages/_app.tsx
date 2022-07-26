// ./src/pages/_app.tsx
import "../client/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import NextApp, { AppProps } from 'next/app';
import { AppDataContext } from 'src/client/ssr/appData';
import { AppData } from 'src/shared/types/app-data';
import { initializeFetch } from 'src/shared/utils/fetch';

class App extends NextApp<AppProps> {
    appData: AppData;

    constructor(props: AppProps) {
        super(props);

        this.appData = props.pageProps.appData || {};
        
        initializeFetch(this.appData.basePath);
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <AppDataContext.Provider value={this.appData}>
                <AnimatePresence exitBeforeEnter>
                    <Component {...pageProps} />
                </AnimatePresence>
            </AppDataContext.Provider>
        );
    }
}

export default App;