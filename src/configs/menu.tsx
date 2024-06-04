import { AppstoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

export const menuData: MenuItem[] = [
  {
    key: 'api',
    label: '页面一',
    icon: <AppstoreOutlined />,
    children: [
      { key: 'page1', label: '页面一' },
    ],
  },
  {
    key: 'page2',
    label: '页面二',
    icon: <AppstoreOutlined />,
  },
  
];