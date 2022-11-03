import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import SelectMovimientos from './sectionsHome/SelectMovementType';
import { useEffect } from 'react';

const MovementsList = ({ movements, columns, title }) => {
  const [movementsFilter, setMovementsFilter] = React.useState('all');
  useEffect(() => {
    console.log(movementsFilter);
  }, [movementsFilter]);
  return (
    <>
      <div style={styles.header}>
        <Typography component="h2" variant="h6" sx={styles.title} gutterBottom>
          {title}
        </Typography>
        <SelectMovimientos
          movementsFilter={movementsFilter}
          setMovementsFilter={setMovementsFilter}
        />
      </div>
      <Box sx={{ height: 500, backgroundColor: 'white' }}>
        <DataGrid
          rows={movements}
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
