import { Card, Flex } from 'antd';
import CountColumn from './CountColumn';
import UserBar from './UserBar';

export default () => {
  return (
    <Flex wrap gap={30}>
      <CountColumn />
      <UserBar />
    </Flex>
  )
}