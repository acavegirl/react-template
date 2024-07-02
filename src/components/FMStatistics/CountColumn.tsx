import { Column } from '@ant-design/plots';
import { Card } from 'antd';

const data = [
  {
    'time': '2024-01',
    'count': 80,
  },{
    'time': '2024-02',
    'count': 100,
  },{
    'time': '2024-03',
    'count': 140,
  },{
    'time': '2024-04',
    'count': 110,
  },{
    'time': '2024-05',
    'count': 200,
  },{
    'time': '2024-06',
    'count': 150,
  },
]

export default () => {
  const config = {
    title: '上传数量统计',
    data,
    xField: 'time',
    yField: 'count',
    label: {
      text: (d: any) => `${d.count}`,
      textBaseline: 'bottom',
    },
    style: {
      // 圆角样式
      radiusTopLeft: 10,
      radiusTopRight: 10,
    },
  };
  return (
    <Card bordered={false}>
      <Column {...config} />
    </Card>
  
  );
};