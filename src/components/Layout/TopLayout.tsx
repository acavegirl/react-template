import React from 'react';
import { ConfigProvider, Flex, Layout } from 'antd';
import MyMenu from '../MyMenu';
import { Outlet } from "react-router-dom";
import UserAvatar from '../UserAvatar';

const { Header, Content } = Layout;

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#003A8F',
      },
      components: {
        Layout: {
          bodyBg: '#fff',
          headerPadding: '0',
          headerBg: '#d9d9d9',
        },
      },
    }}
  >
    <Layout>
      <Header style={{display: 'flex', backgroundImage: 'url(http://www.sim.ac.cn/images/road2023-b4.jpg)', backgroundSize: 'cover'}}>
        <div className="glass">
          <img src="http://www.sim.ac.cn/images/guide2019-logo.png" />
          <div style={{color: '#003A8F', fontWeight: 700, fontSize: '22px', marginLeft: '40px'}}>全域数据汇聚采集系统</div>
          <div style={{marginLeft: 'auto', display: 'flex'}}>
            <MyMenu />
            <UserAvatar />
          </div>
        </div>
      </Header>
      
      <Content><Outlet /></Content>
    </Layout>
  </ConfigProvider>
  
);

export default App;