import { Button, Form, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateCategoryPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const categoryId = params.id;

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if(response.ok)
        message.success("Category Updated successful")
      else
        message.error("Category Updated unsuccesfull") 


    } catch (error) {
      console.log(error);
    }
    finally{
        setLoading(false)
    }
  };

  useEffect(() => {
    const fetchSingleCategory = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/categories/${categoryId}`);
        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }

        const data = await response.json();
        if (data) {
          form.setFieldsValue({
            name: data.name,
            img: data.img,
          });
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchSingleCategory();
  }, [apiUrl, categoryId, form]);
  return (
    <Spin spinning={loading}>
    <Form
    
      form={form}
      name="basic"
      layout="vertical"
      autoComplete="off"
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
        Update
      </Button>
    </Form>
    </Spin>
  );
};

export default UpdateCategoryPage;
