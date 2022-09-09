import { makeStyles } from '@mui/styles';
import { NextPage } from 'next/types';
import Dashboard from '../client/layouts/dashboard';

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Home: NextPage = () => {
  const classes = useStyles();
  return (
    <Dashboard>
      <div className={classes.main}>
        <h1>Home</h1>
      </div>
    </Dashboard>
  );
};

export default Home;
