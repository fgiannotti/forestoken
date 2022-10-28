// ./src/pages/index.tsx
import Link from 'next/link';
import {FC} from 'react';
import {BlogPost} from 'src/shared/types/blog-post';
import {fetch} from 'src/shared/utils/fetch';
import {buildServerSideProps} from 'src/client/ssr/buildServerSideProps';
import {useFeature} from 'src/client/hooks/useFeature';
import withTransition from 'src/client/HOC/withTransition';
import {ThemeProvider} from 'theme-ui';
import theme from 'src/client/theme/themeLanding';
import Seo from 'src/client/components/Seo';
import Layout from 'src/client/components/layout';
import Banner from 'src/client/components/sectionsLanding/banner';
import WhyChoose from 'src/client/components/sectionsLanding/why-choose';
import RoadMap from 'src/client/components/sectionsLanding/roadmap';
import CountDownBlock from 'src/client/components/sectionsLanding/countdown';
import OurWallet from 'src/client/components/sectionsLanding/our-wallet';
import CallToAction from 'src/client/components/sectionsLanding/call-to-action';


const Home: FC<any> = () => {

    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <Seo title="Forestoken Landing" description="Welcome to Forestoken!"/>
                <Banner/>
                <WhyChoose/>
                <CountDownBlock/>
                <RoadMap/>
                <OurWallet/>
                <CallToAction/>
            </Layout>
        </ThemeProvider>
    );
};

export default withTransition(Home);

//export default Home;
