import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <span>退出登录</span>
    ),
  }
];

export default () => {
  return (<>
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
      <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }} icon={<UserOutlined />} />
      </a>
    </Dropdown>
  </>)
}