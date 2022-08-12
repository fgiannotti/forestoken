// ./src/pages/index.tsx
import Link from 'next/link';
import { FC } from 'react';
import { fetch } from 'src/shared/utils/fetch';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';
import { useFeature } from 'src/client/hooks/useFeature';
import Navbar from 'src/client/components/Navbar';
import withTransition from 'src/client/HOC/withTransition';

const Services: FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <h1>Service Page</h1>
      </main>
    </>
  );
};

// export const getServerSideProps = buildServerSideProps(async () => {});
export default withTransition(Services);
