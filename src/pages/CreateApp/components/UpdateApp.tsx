import React from 'react';
import { AppItem } from '../data';
import { Form, Modal, Input, Button } from 'antd';
const FormItem = Form.Item;
export interface FormValueType extends AppItem {}
interface UpdateAppProps {
  appMessage: AppItem;
  modalVisible: boolean;
  onSubmit: (fieldsValue: FormValueType) => void;
  onCancel: () => void;
}
const UpdateApp: React.FC<UpdateAppProps> = props => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  };
  const { modalVisible, onSubmit: handleEdit, onCancel, appMessage } = props;
  const okHandle = async () => {
    const fieldsValue = (await form.validateFields()) as FormValueType;
    form.resetFields();
    handleEdit(fieldsValue);
  };
  const footerRender = () => {
    return (
      <div>
        <div>
          <Button type="primary" style={{ float: 'left' }}>
            导出EXCEL
          </Button>
        </div>
        <div>
          <Button onClick={() => onCancel()}>取消</Button>
          <Button type="primary" onClick={okHandle}>
            确认
          </Button>
        </div>
      </div>
    );
  };
  return (
    <Modal
      destroyOnClose
      title="编辑应用信息"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
      width={800}
      okText="确认"
      cancelText="取消"
      afterClose={() => onCancel()}
      footer={footerRender()}
    >
      <Form {...layout} form={form} initialValues={appMessage}>
        <FormItem
          label="应用代码"
          name="appCode"
          rules={[{ required: true, message: '请输入应用代码' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          label="应用名称"
          name="appName"
          rules={[{ required: true, message: '请输入应用名称' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          label="链接地址"
          name="connectUrl"
          rules={[{ required: true, message: '请输入链接地址' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          label="设备类型"
          name="deviceType"
          rules={[{ required: true, message: '请输入设备类型' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          label="数据库类型"
          name="dbType"
          rules={[{ required: true, message: '请选择数据库类型' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          label="价格策略"
          name="priceType"
          rules={[{ required: true, message: '请选择价格策略' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem label="价格" name="price">
          <Input placeholder="请输入" />
        </FormItem>
      </Form>
    </Modal>
  );
};
export default UpdateApp;
