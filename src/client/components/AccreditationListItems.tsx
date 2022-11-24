import ListItemText from '@mui/material/ListItemText';
import { Button } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import React from 'react';

const AccreditationListItems = ({ title, path }) => {
  return (
    <ListItem>
      <ListItemText primary={title} secondary={path || 'No indicado'} />
      <a href={`/files/${path}`}>
        <Button color="secondary">Descargar</Button>
      </a>
    </ListItem>
  );
};

export default AccreditationListItems;
