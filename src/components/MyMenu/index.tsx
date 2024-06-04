import React from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from "react-router-dom";
import { menuData } from '@/configs/menu';

const MyMenu:React.FC = () => {
  const navigate = useNavigate();
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.keyPath.reverse().join('/'));
  };

  return (
    <Menu
      onClick={onClick}
      defaultSelectedKeys={['page1']}
      defaultOpenKeys={['api']}
      mode="inline"
      items={menuData}
    />
  )
}

export default MyMenu
