import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import SelectMovementType from './sectionsHome/SelectMovementType';

const MovementsList = ({ movements, columns, title, userId }) => {
  const [movementsFilter, setMovementsFilter] = React.useState('all'),
    [movementsFiltered, setMovementsFiltered] = React.useState(movements);

  React.useEffect(() => {
    axios
      .get(
        `/movements?userId=${userId}${
          movementsFilter != 'all'
            ? `&movementType=${movementsFilter == 'debits' ? 1 : 0}`
            : ''
        }`,
      )
      .then((res) => {
        setMovementsFiltered(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [movementsFilter]);

  return (
    <>
      <div style={styles.header}>
        <Typography component="h2" variant="h6" sx={styles.title} gutterBottom>
          {title}
        </Typography>
        <SelectMovementType
          movementsFilter={movementsFilter}
          setMovementsFilter={setMovementsFilter}
        />
      </div>
      <Box sx={{ height: 500, backgroundColor: 'white' }}>
        <DataGrid
          rows={movementsFiltered}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7]}
          disableSelectionOnClick
        />
      </Box>
    </>
  );
};

export default MovementsList;

const styles = {
  header: {
    display: 'flex',
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
    paddingTop: '5%',
  },
  title: {
    fontWeight: '400',
    fontSize: '1.5rem',
    color: 'gray',
  },
};
