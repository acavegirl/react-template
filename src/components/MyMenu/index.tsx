import React from 'react';
import type { MenuProps } from 'antd';
import { ConfigProvider, Menu } from 'antd';
import { useNavigate } from "react-router-dom";
import { menuData } from '@/configs/menu';

const MyMenu:React.FC = (props: any) => {
  const navigate = useNavigate();
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.keyPath.reverse().join('/'));
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemBg: 'rgba( 255, 255, 255, 0 )'
          },
        },
      }}
    >
      <Menu
        style={{margin: '0 20px'}}
        onClick={onClick}
        // defaultSelectedKeys={['page1']}
        // defaultOpenKeys={['api']}
        // mode="inline"
        mode="horizontal"
        items={menuData}
      />
    </ConfigProvider>
    
  )
}

export default MyMenu
