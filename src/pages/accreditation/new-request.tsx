import Layout from '../../client/layouts/dashboard';
import StepForm from './components/StepForm/StepForm';

const NewRequest = () => {
  return (
    <Layout>
      <h1>Nueva solicitud</h1>
      <StepForm />
    </Layout>
  );
};

export default NewRequest;
