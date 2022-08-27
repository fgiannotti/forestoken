// ./src/pages/index.tsx
import Link from 'next/link';
import { FC } from 'react';
import { BlogPost } from 'src/shared/types/blog-post';
import { fetch } from 'src/shared/utils/fetch';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';
import { useFeature } from 'src/client/hooks/useFeature';
import withTransition from 'src/client/HOC/withTransition';
import Navbar from 'src/client/components/Navbar';

type THomeProps = {
  blogPosts: BlogPost[];
};

const Home: FC<THomeProps> = ({ blogPosts }) => {
  const linkFeature = useFeature('blog_link');

  return (
    <>
      <Navbar />
      <h1>Home</h1>
      <a href="/api/auth/login">Login</a>
      {blogPosts.map(({ title, id }) => (
        <div key={id}>
          {linkFeature ? (
            <>
              {title}
              <Link href={`/${id}`}> Link</Link>
            </>
          ) : (
            <Link href={`/${id}`}>{title}</Link>
          )}
        </div>
      ))}
    </>
  );
};

export const getServerSideProps = buildServerSideProps<THomeProps>(async () => {
  const blogPosts = await fetch('/api/blog-posts');
  return { blogPosts };
});

export default withTransition(Home);

//export default Home;
