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
import { Avatar, Divider } from '@mui/material';
import { UserContext } from 'src/pages/home';
import Image from 'next/image';
import { deleteCookie } from 'src/shared/utils/cookieManagment';
import { useRouter } from 'next/router';

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
};

const MenuList = () => {
  const router = useRouter();
  const { user } = React.useContext(UserContext);
  
  const getInitials = () => {
    if (user) {
      const names = user?.name.split(" ");
      return names[0]?.[0] + names?.[1]?.[0];
    }
  }

  const logout = () => {
    deleteCookie("userData")
    router.push("/")
  }

  return (
    <React.Fragment>
      {user && (
        <ListItemButton as="div" style={styles.listItem}>
          <ListItemIcon>
            <Avatar style={styles.icon}>{user.image ? (
              <Image src={user.image} layout="fill" />
            ) : getInitials()}</Avatar>
          </ListItemIcon>
          <ListItemText primary={user?.name} />
        </ListItemButton>
      )}
      <Divider />
      {ListItem.map((item, index) => (
        <Link href={item.href}>
          <ListItemButton key={index} style={styles.listItem}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </Link>
      ))}
      <ListItemButton style={styles.listItem} onClick={logout}>
        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
        <ListItemText primary={"Salir"} />
      </ListItemButton>
    </React.Fragment>
  )
};

export default MenuList