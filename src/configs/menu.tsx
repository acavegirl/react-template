import { AppstoreOutlined, PieChartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

export const menuData: MenuItem[] = [
  {
    key: 'statistics',
    label: '后台统计',
    icon: <PieChartOutlined />,
  },
  {
    key: 'fm',
    label: '数据管理',
    icon: <AppstoreOutlined />,
  },
];