import React, { useState } from 'react';
import { InboxOutlined  } from '@ant-design/icons';
import { Button, message, Upload, Modal, Row, Col, Form, Select } from 'antd';
import type { GetProp, UploadFile, UploadProps, FormProps } from 'antd';
import { getFileChunkInfo } from '@/utils/uploadFile';
import type { FileChunk } from '@/utils/uploadFile';

const { Dragger } = Upload;
const { Option } = Select;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export interface FileProcessInfo {
  md5: string;
  fileName: string;
  fileProcess: number;
  status: "success" | "exception" | "normal" | "active" | undefined;
}

type FieldType = {
  platform?: string;
  device?: string;
  file?: any;
};

// const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
//   console.log('Success:', values);
// };

// const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };

export default (props: any) => {
  const { isModalOpen, setIsModalOpen, activeFolder, updateFileStatus, setActiveFolder } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [form] = Form.useForm();

  const uploadSingleFile = (file: UploadFile<any>, platform="", device="") => {
    // console.log('single')
    return getFileChunkInfo(file).then((fileInfo: any)=>{
      // console.log('fileInfo', fileInfo)
      const { md5, fileName, fileSize, totalChunkNumber, fileChunkList } = fileInfo
      // 根据 md5 获取文件上传状态：已上传 | 未上传 | 部分上传
      const fileStatusReturnData = {
        done: false,
        chunkIndexList: ['0', '1', '2'],
      }
      const { done, chunkIndexList } = fileStatusReturnData

      if (done === true) {
        // 处理已经上传成功逻辑
        updateFileStatus({
          md5,
          fileName,
          fileProcess: 100,
          status: 'success'
        })
      } else {
        // 部分上传或未上传
        const toUploadFileChunkList = fileChunkList.filter((item: FileChunk)=>!chunkIndexList.includes(item.chunkIndex));
        // console.log('toUploadFileChunkList', toUploadFileChunkList)
        if (!toUploadFileChunkList.length) {
          // 请求merge接口
          updateFileStatus({
            md5,
            fileName,
            fileProcess: 100,
            status: 'success'
          })
        }
        let uploadChunkNum = chunkIndexList.length
        const reqList = toUploadFileChunkList.map((item: FileChunk) => {
          // 对每个文件片都单独发出请求
          let formData = new FormData();
          formData.append('md5', md5);
          formData.append('fileName', fileName);
          formData.append('fileSize', fileSize);
          formData.append('totalChunkNumber', totalChunkNumber);
          formData.append('chunkIndex', item.chunkIndex);
          formData.append('fileChunk', item.fileChunk);
          if (platform) formData.append('platform', platform);
          if (device) formData.append('device', device);
          // 发送请求
          // return upload(formData, (e) => {
          //   // 当前分片上传完成
          //   if (e.loaded === e.total) {
          //     uploadChunkNum++
          //     updateFileStatus({
          //       md5,
          //       fileName,
          //       fileProcess: uploadChunkNum / totalChunkNumber * 100,
          //       status: 'active'
          //     })
          //   }
          // });
          // console.log('data', activeFolder)
          return true
        })
        Promise.all(reqList).then(() => {
          // console.log('success')
          // 全部上传成功，请求merge接口
          updateFileStatus({
            md5,
            fileName,
            fileProcess: 100,
            status: 'success'
          })
        }).catch(()=>{
          // console.log('exception')
          // 有文件片上传失败
          updateFileStatus({
            md5,
            fileName,
            fileProcess: uploadChunkNum / totalChunkNumber * 100,
            status: 'exception'
          })
        })
      }
    }).catch((error) => {
      message.error(error)
    })
  }


  const handleOk = () => {
    const { platform, device } = form.getFieldsValue()
    // console.log('handleOk', platform, device)
    fileList.forEach((file: UploadFile<any>) => uploadSingleFile(file, platform, device))
    setIsModalOpen(false);
    setFileList([]);
    setActiveFolder([]);
    form.resetFields()
    // console.log(form.getFieldsValue())
    // console.log(fileList)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFileList([]);
    form.resetFields()
  };

  const uploadProps: UploadProps = {
    multiple: true,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      // console.log('file', file)
      setFileList((fileList)=> [...fileList, file]);

      return false;
    },
    fileList,
  };

  return (
    <>
      <Modal
        title="选择上传文件"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="取消"
        okText="上传"
        maskClosable={false}
      >
        <Form
          name="basic"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, marginTop: 20 }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item<FieldType>
            label="平台"
            name="platform"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Select
              placeholder="请选择平台"
              allowClear
            >
              <Option value="pf1">平台1</Option>
              <Option value="pf2">平台2</Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="设备"
            name="device"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Select
              placeholder="请选择设备"
              allowClear
            >
              <Option value="d1">设备1</Option>
              <Option value="d2">设备2</Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            name="file"
          >
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">上传文件</p>
            </Dragger>
          </Form.Item>
        </Form>
        
      </Modal>
    </>
  );
};