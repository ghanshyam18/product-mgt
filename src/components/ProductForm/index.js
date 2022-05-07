import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Modal, Rate } from 'antd';

const { TextArea } = Input;

function ProductForm(props) {
  const { visible = null, onCancel, submitProduct = () => {} } = props;
  
  const [form] = Form.useForm();

  const isEdit = !!visible?.id;

  useEffect(() => {
    if (visible) {
      if (isEdit) {
        form.setFieldsValue({ ...visible });
      } else {
        form.resetFields();
      }
    }
  }, [visible, isEdit, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      submitProduct({ ...values, ...visible?.id && { id: visible.id } });
    });
  };

  return (
    <Modal
      title={isEdit ? `Edit Product #${visible.id}` : "Add Product"}
      okText={isEdit ? "Edit" : "Add"}
      onOk={handleSubmit}
      onCancel={onCancel}
      visible={!!visible}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: 'Please enter Name' },
            { whitespace: true, message: 'Please enter valid Name' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: 'Please enter Price' },
          ]}
        >
          <InputNumber prefix="$" min={1} style={{ minWidth: '100%' }} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: 'Please enter Description' },
            { whitespace: true, message: 'Please enter valid Description' },
          ]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          name="rating"
          label="Rating"
          rules={[
            { required: true, message: 'Please select Rating' },
          ]}
        >
          <Rate />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ProductForm;