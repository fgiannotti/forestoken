// ./src/pages/index.tsx
import Link from 'next/link';
import { FC } from 'react';
import { BlogPost } from 'src/shared/types/blog-post';
import { fetch } from 'src/shared/utils/fetch';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';
import { useFeature } from 'src/client/hooks/useFeature';
import withTransition from 'src/client/HOC/withTransition';
import { ThemeProvider } from 'theme-ui';
import theme from 'src/client/theme/themeLanding';
import Layout from 'src/client/components/layout';
import Banner from 'src/client/components/sectionsLanding/banner';
import WhyChoose from 'src/client/components/sectionsLanding/why-choose';
import RoadMap from 'src/client/components/sectionsLanding/roadmap';
import CountDownBlock from 'src/client/components/sectionsLanding/countdown';
import OurWallet from 'src/client/components/sectionsLanding/our-wallet';
import CallToAction from 'src/client/components/sectionsLanding/call-to-action';

type THomeProps = {
  blogPosts: BlogPost[];
};

const Home: FC<THomeProps> = ({ blogPosts }) => {
  const linkFeature = useFeature('blog_link');

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Banner />
        <WhyChoose />
        <CountDownBlock />
        <RoadMap />
        <OurWallet />
        <CallToAction />
      </Layout>
    </ThemeProvider>
  );
};

export const getServerSideProps = buildServerSideProps<THomeProps>(async () => {
  const blogPosts = await fetch('/api/blog-posts');
  return { blogPosts };
});

export default withTransition(Home);

//export default Home;
