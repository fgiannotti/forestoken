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
import { Avatar, Divider, ListItem } from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { UserContext } from 'src/client/contexts/user/user.context';
import Image from 'next/image';
import { deleteCookie } from 'src/shared/utils/cookieManagment';
import { useRouter } from 'next/router';

//obtendria de la session o localstorage el rol del usuario
const isAdmin = true;
const ArrayItem = [
  {
    text: 'Inicio',
    icon: <HomeIcon />,
    href: '/home',
  },
  {
    text: 'Solicitudes de Acreditación',
    icon: <RequestIcon />,
    href: '/accreditation',
  },
  {
    text: 'Comercios Adheridos',
    icon: <StoreIcon />,
    href: '/affiliates',
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
  isAdmin && {
    text: 'Admin',
    icon: <SupervisorAccountIcon />,
    href: '/admin',
  },
];

const styles = {
  icon: {
    marginRight: '5px',
    width: 30,
    height: 30,
    fontSize: '0.8rem',
  },
  listItem: {
    margin: '5px',
  },
  avatarListItem: {
    margin: '5px',
    cursor: 'pointer',
  },
};

const MenuList = () => {
  const router = useRouter();
  const userContext = React.useContext(UserContext);
  const user = userContext?.state;
  const getInitials = () => {
    if (user) {
      const names = user?.name?.split(' ');
      return names[0]?.[0] + names?.[1]?.[0];
    }
  };

  const logout = () => {
    deleteCookie('userData');
    deleteCookie('accessToken');
    router.push('/');
  };

  return (
    <React.Fragment>
      {user && (
        <ListItem>
          <ListItemAvatar>
            <Avatar style={styles.icon}>
              {user.image ? (
                <Image src={user.image} layout="fill" />
              ) : (
                getInitials()
              )}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user?.name} />
        </ListItem>
      )}
      <Divider />
      {ArrayItem.map((item, index) => (
        <Link href={item.href} key={index}>
          <ListItemButton style={styles.listItem}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </Link>
      ))}
      <ListItemButton style={styles.listItem} onClick={logout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary={'Salir'} />
      </ListItemButton>
    </React.Fragment>
  );
};

export default MenuList;
