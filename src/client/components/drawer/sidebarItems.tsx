import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import RequestIcon from '@mui/icons-material/RequestQuote';
import StoreIcon from '@mui/icons-material/Store';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HelpIcon from '@mui/icons-material/Help';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Avatar, Divider, Icon } from '@mui/material';
import Copyright from '../copyright';

const ListItem = [
  {
    text: 'Inicio',
    icon: <HomeIcon />,
    href: '/home',
  },
  {
    text: 'Solicitudes de Acreditación',
    icon: <RequestIcon />,
    href: '/acreditacion',
  },
  {
    text: 'Comercios Adheridos',
    icon: <StoreIcon />,
    href: '/comercios-adheridos',
  },
  {
    text: 'Movimientos',
    icon: <AttachMoneyIcon />,
    href: '/movimientos',
  },
  {
    text: 'Ayuda',
    icon: <HelpIcon />,
    href: '/ayuda',
  },
  {
    text: 'Salir',
    icon: <ExitToAppIcon />,
    href: '/login',
  },
];

const styles = {
  user: {
    display: 'flex',
    flexDirection: 'row',
    margin: '5px',
    marginBottom: '15px',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85rem',
  },
  icon : {
    marginRight: '5px',
    width: 30,
    height: 30,
    fontSize: '0.8rem',
  },
  listItem: {
    margin: '5px',
  },
};

export const menuList = (
  <React.Fragment style={{width:'100%'}}>
    <ListItemButton as="div" style={styles.listItem}>
      <ListItemIcon>
        <Avatar style={styles.icon}>JP</Avatar>
      </ListItemIcon>
      <ListItemText primary={"Juan Perez"} />
    </ListItemButton>
    <Divider/>
    {ListItem.map((item, index) => (
      <Link href={item.href}>
        <ListItemButton key={index} style={styles.listItem}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      </Link>
    ))}
    <Copyright />
  </React.Fragment>
);

export function hideCopyRight() {
