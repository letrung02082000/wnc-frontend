import { PATH } from './path';
import { SiGoogleclassroom } from 'react-icons/si';
import { ImProfile } from "react-icons/im";

export const ADMIN_MENU = [
  {
    label: 'Danh sách tài khoản',
    icon: <ImProfile />,
    path: PATH.ADMIN.USER,
  },
  {
    label: 'Danh sách lớp',
    icon: <SiGoogleclassroom />,
    path: PATH.ADMIN.CLASS,
  },
];
