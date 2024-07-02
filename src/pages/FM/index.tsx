import FileManager from '@/components/FileManager';
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';

export default () => {
  return (
    <ConfigProvider locale={zhCN}>
      <FileManager />
    </ConfigProvider>
  );
}