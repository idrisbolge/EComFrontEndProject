import { Button, Form, Input, Spin, message } from "antd";
import { useState } from "react";

const CreateCategoryPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [form]  = Form.useForm();
  
  

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const response = await fetch(`${apiUrl}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if(response.ok){
        message.success("Category created successful")
        form.resetFields();
      }
        
      else
        message.error("Category created unsuccesfull") 


    } catch (error) {
      console.log(error);
    }
    finally{
        setLoading(false)
    }
  };

  

  return (
    <Spin spinning={loading}>
    <Form
        form={form}
      name="basic"
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        label="Category Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your category name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Category Image"
        name="img"
        rules={[
          {
            required: true,
            message: "Please input your category image link!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Create
      </Button>
    </Form>
    </Spin>
  );
};

export default CreateCategoryPage;