import { PATH } from './path';
import { SiGoogleclassroom } from 'react-icons/si';
import { CiLogin } from 'react-icons/ci';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { ImProfile } from "react-icons/im";

export const CLASS_MENU = [
  {
    label: 'Lớp đã tạo',
    icons: <ImProfile />,
    path: PATH.CLASS.ME,
    children: [
      {
        label: 'Danh sách',
        path: PATH.CLASS.ME,
        icon: <SiGoogleclassroom />,
      },
      {
        label: 'Tạo mới',
        path: PATH.CLASS.CREATE,
        icon: <MdOutlineCreateNewFolder />,
      },
    ],
  },
  {
    label: 'Lớp đã tham gia',
    icons: <SiGoogleclassroom />,
    path: PATH.CLASS.JOINED,
    children: [
      {
        label: 'Danh sách',
        path: PATH.CLASS.JOINED,
        icon: <SiGoogleclassroom />,
      },
      {
        label: 'Tham gia',
        path: PATH.CLASS.JOIN,
        icon: <CiLogin />,
      },
    ],
  },
];
