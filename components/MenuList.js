import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
const menuList = [
  {
    key: '/',
    title: 'index',
    icon: <MailOutlined />,
    children: [],
  },
  {
    key: '/setInterval',
    title: 'setInterval',
    icon: <CalendarOutlined />,
    children: [],
  },
  {
    key: '/count',
    title: 'count',
    icon: <AppstoreOutlined />,
    children: [],
  },
  {
    key: '/title',
    title: 'title',
    icon: <AppstoreOutlined />,
    children: [],
  },
  {
    key: '/UmiHook',
    title: 'UmiHook',
    icon: <AppstoreOutlined />,
    children: [],
  },
  {
    key: '/sub1',
    title: 'sub1',
    icon: <SettingOutlined />,
    children: [
      {
        key: '/home',
        title: 'home',
      },
    ],
  },
];

const defaultMenu = {
  defaultSelectedKeys: ['/index'],
  defaultOpenKeys: ['/sub1'],
};

export { menuList, defaultMenu };
