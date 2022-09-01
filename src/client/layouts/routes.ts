// @material-ui/icons
import Dashboard from '@mui/icons-material/Dashboard';
import Person from '@mui/icons-material/Person';
import People from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import GroupsIcon from '@mui/icons-material/Groups';
import RoomIcon from '@mui/icons-material/Room';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ScheduleSendOutlinedIcon from '@mui/icons-material/ScheduleSendOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import PhotoCameraFrontOutlinedIcon from '@mui/icons-material/PhotoCameraFrontOutlined';
import ResetTvOutlinedIcon from '@mui/icons-material/ResetTvOutlined';
import LoginIcon from '@mui/icons-material/Login';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,

    layout: '/admin',
  },
  {
    path: '/Cuenta/datos',
    name: 'Cuenta',
    icon: Person,

    layout: '/admin',
  },
  {
    path: '/Cuenta/usuarios',
    name: 'Usuarios',
    icon: People,

    layout: '/admin',
  },
  {
    path: '/Cuenta/empresa',
    name: 'Empresa',
    icon: BusinessIcon,

    layout: '/admin',
  },
  {
    path: '/Legajos',
    name: 'Legajos',
    icon: GroupsIcon,

    layout: '/admin',
  },
  {
    path: '/Lugares',
    name: 'Lugares',
    icon: RoomIcon,

    layout: '/admin',
  },
  {
    path: '/Turnos',
    name: 'Turnos',
    icon: DateRangeIcon,

    layout: '/admin',
  },
  {
    path: '/Supervision/llegadas-esperadas',
    name: 'Llegadas Esperadas',
    icon: ScheduleSendOutlinedIcon,

    layout: '/admin',
  },
  {
    path: '/Supervision/supervision-llegadas',
    name: 'Supervision Llegadas',
    icon: SupervisorAccountOutlinedIcon,

    layout: '/admin',
  },
  {
    path: '/Supervision/reconocimiento-facial',
    name: 'Reconocimiento Facial',
    icon: PhotoCameraFrontOutlinedIcon,

    layout: '/admin',
  },
  {
    path: '/Supervision/reset-remoto',
    name: 'Reset Remoto',
    icon: ResetTvOutlinedIcon,

    layout: '/admin',
  },
  {
    path: '/logout',
    name: 'Logout',
    icon: LogoutIcon,

    layout: '/admin',
  },
];

export default dashboardRoutes;
