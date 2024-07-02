import { Sunburst } from '@ant-design/plots';
import { Card } from 'antd';

const data = {
  "name": "上传数量",
  "children": [
    {
      "name": "部门1",
      "value": 40,
      "children": [
        {
          "name": "人员1",
          "value": 11
        },
        {
          "name": "人员2",
          "value": 10
        },
        {
          "name": "人员3",
          "value": 10
        },
        {
          "name": "人员4",
          "value": 9
        }
      ]
    },
    {
      "name": "部门2",
      "value": 60,
      "children": [
        {
          "name": "人员1",
          "value": 1
        },
        {
          "name": "人员2",
          "value": 15
        },
        {
          "name": "人员3",
          "value": 19
        },
        {
          "name": "人员4",
          "value": 15
        },
        {
          "name": "人员5",
          "value": 20
        },
      ]
    },
    {
      "name": "部门3",
      "value": 60,
      "children": [
        {
          "name": "人员1",
          "value": 5
        },
        {
          "name": "人员2",
          "value": 5
        },
        {
          "name": "人员3",
          "value": 10
        },
        {
          "name": "人员4",
          "value": 8
        },
        {
          "name": "人员5",
          "value": 22
        }
      ]
    }
  ]
}

export default () => {
  const config = {
    title: "上传部门和人员统计",
    data: {value: data},
    label: {
      text: 'name',
      transform: [
        {
          type: 'overflowHide',
        },
      ],
    },
    animate: {
      enter: { type: 'waveIn' }
    },
    innerRadius: 0.3,
  };

  return (
    <Card bordered={false}>
      <Sunburst {...config} />
    </Card>
  
  );
};