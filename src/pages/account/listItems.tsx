import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ListItem } from '@mui/material';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItem>
        <ListItemIcon>
          <CircleOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="DATOS GENERALES" />
      </ListItem>
    </ListItemButton>
    <ListItemButton>
      <ListItem>
        <ListItemIcon>
          <CircleOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="VERIFICACIÓN" />
      </ListItem>
    </ListItemButton>
    <ListItemButton>
      <ListItem>
        <ListItemIcon>
          <CircleOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="DATOS PERSONALES" />
      </ListItem>
    </ListItemButton>
    <ListItemButton>
      <ListItem>
        <ListItemIcon>
          <CircleOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="DOCUMENTACION" />
      </ListItem>
    </ListItemButton>
    <ListItemButton>
      <ListItem>
        <ListItemIcon>
          <CircleOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="RESUMEN" />
      </ListItem>
    </ListItemButton>
  </React.Fragment>
);
