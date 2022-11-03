import Layout from '../../client/layouts/dashboard';
import StepForm from './components/StepForm/StepForm';
import { useRouter } from 'next/router';

const NewRequest = () => {
  const router = useRouter();
  return (
    <Layout>
      <StepForm userId={router.query.userId} />
    </Layout>
  );
};

export default NewRequest;
