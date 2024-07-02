import React, { useEffect, useState } from 'react';
import { ConfigProvider, Table, Input, Tag } from 'antd';
import type { TableColumnsType } from 'antd';
import { FolderOutlined, FileOutlined } from '@ant-design/icons';
import { SearchProps } from 'antd/es/input';

const { Search } = Input;

interface DataType {
  id: string;
  name: string;
  type: string;
  size: string;
  isFolder: boolean;
  modifiedTime: string;
  platform?: string;
  device?: string;
}

const deviceMap = new Map([
  ['d1', '设备1'],
  ['d2', '设备2']
])
const platformMap = new Map([
  ['pf1', '平台1'],
  ['pf2', '平台2']
])

const columns: TableColumnsType<DataType> = [
  {
    title: '名称',
    dataIndex: 'name',
    render: (text, record) => (
      <div>
        {/* { record.isFolder ?
          <FolderTwoTone style={{marginRight: '10px'}} twoToneColor="#fa8c16"/> :
          <FileTwoTone style={{marginRight: '10px'}} twoToneColor="#434343" />
        } */}
        { record.isFolder ?
          <FolderOutlined style={{marginRight: '10px'}} /> :
          <FileOutlined style={{marginRight: '10px'}} />
        }
        { text }
      </div>
    ),
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: '类型',
    dataIndex: 'type',
    filterMultiple: true,
    filters: [{
      text: 'PDF',
      value: 'PDF'
    }, {
      text: 'TXT',
      value: 'TXT'
    }, {
      text: 'PNG',
      value: 'PNG'
    }],
    onFilter: (value, record) => record.type.indexOf(value as string) === 0,
  },
  {
    title: '大小',
    dataIndex: 'size',
    sorter: (a, b) => a.size.length - b.size.length,
  },
  {
    title: '修改时间',
    dataIndex: 'modifiedTime',
    sorter: (a, b) => a.modifiedTime.length - b.modifiedTime.length,
  },
  {
    title: '平台',
    dataIndex: 'platform',
    filterMultiple: true,
    filters: [{
      text: '平台1',
      value: 'pf1'
    }, {
      text: '平台2',
      value: 'pf2'
    }],
    onFilter: (value, record) => record.platform?.indexOf(value as string) === 0,
    render: (text, record) => (
      <Tag color="processing">{platformMap.get(text)}</Tag>
    ),
  },
  {
    title: '设备',
    dataIndex: 'device',
    filterMultiple: true,
    filters: [{
      text: '设备1',
      value: 'd1'
    }, {
      text: '设备2',
      value: 'd2'
    }],
    onFilter: (value, record) => record.device?.indexOf(value as string) === 0,
    render: (text, record) => (
      <Tag color="orange">{deviceMap.get(text)}</Tag>
    ),
  },
];



interface PropsType {
  curSelectFolder?: React.Key;
  activeFolder: string[];
  setActiveFolder?: any;
  setCurSelectFolder: any;
}
export default (props: PropsType) => {
  const { curSelectFolder, activeFolder, setActiveFolder, setCurSelectFolder } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);

  useEffect(()=> {
    if (!curSelectFolder) return
    const dataList: DataType[] = [];
    for (let i = 0; i < 46; i++) {
      dataList.push({
        id: `id${i}`,
        name: `${curSelectFolder} ${i}`,
        type: i%2==0 ? '' : "PDF",
        size: '1024k',
        modifiedTime: `${new Date()}`,
        isFolder: i%2==0 ? true : false,
        platform: i%2==0 ? 'pf1' : 'pf2',
        device: i%2==0 ? 'd1' : 'd2',
      });
    }
    setData(dataList)
  }, [curSelectFolder])

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setActiveFolder([])
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setActiveFolder(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys: activeFolder,
    onChange: onSelectChange,
  };
  const hasSelected = activeFolder.length > 0;

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              borderColor: '#fff',
              cellPaddingBlock: 9,
              headerBorderRadius: 0,
            },
          },
        }}
      >
        <Table
          style={{minHeight: 'calc(100vh - 110px)',}}
          rowKey="id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={false}
          onRow={(record, index)=>{
            return {
              onClick: ()=> {
                // 选择 & 取消选择
                if (activeFolder.includes(record.id)) {
                  const newIds = activeFolder.filter((item)=> item !== record.id);
                  setActiveFolder(newIds)
                } else {
                  setActiveFolder((oldVal: string[])=> [...oldVal, record.id])
                }
              },
              onDoubleClick: ()=>{
                setCurSelectFolder(record.id);
                setActiveFolder([]);
                console.log(record)
              }
            }
          }}
        />
      </ConfigProvider>
    </div>
  );
};