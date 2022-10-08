// ./src/pages/[id].tsx
import Link from 'next/link';
import { FC } from 'react';
import withTransition from 'src/client/HOC/withTransition';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';
import { fetch } from 'src/shared/utils/fetch';

const Blog: FC = ({ accreditation = {} }) => {
  return (
    <div>
      <Link href={'/'}>Home</Link>
      <h1>Blog {accreditation.title}</h1>
    </div>
  );
};

export const getServerSideProps = buildServerSideProps<any, any>(
  async (ctx) => {
    const id = ctx.query.id;

    const accreditation = await fetch(`/accreditation/admin/${id}`);

    return { accreditation };
  },
);

export default withTransition(Blog);
