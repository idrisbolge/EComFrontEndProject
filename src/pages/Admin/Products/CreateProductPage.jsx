import { Button, Form, Input, InputNumber, Select, Spin, message } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateProductPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/categories`);
        const data = await response.json();

        if (response.ok) {
          setCategories(data);
        } else message.error("Kullanıcı Getirme İşleminde Hata Alındı.");
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchCategories();
  }, [apiUrl]);

  function TextToArray(text) {
    var returnValue = text.split("\n").map((t) => t.trim());
    return returnValue;
  }

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const imgLinks = TextToArray(values.img);
      const colors = TextToArray(values.colors);
      const sizes = TextToArray(values.sizes);

      console.log(values);
      const response = await fetch(`${apiUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          price: {
            current: values.current,
            discount: values.discount,
          },
          colors: colors,
          sizes: sizes,
          img: imgLinks,
        }),
      });

      if (response.ok) {
        message.success("Product created successful");
        form.resetFields();
      } else message.error("Product created unsuccesfull");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your product name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please input your product category!",
            },
          ]}
        >
          <Select>
            {categories.map((category) => (
              <Select.Option value={category._id} key={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Price"
          name="current"
          rules={[
            {
              required: true,
              message: "Please input your product price!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item label="Discount Percent" name="discount">
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Product Image(Links)"
          name="img"
          rules={[
            {
              required: true,
              message: "Please input your product image links!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Colors (RGB Code)"
          name="colors"
          rules={[
            {
              required: true,
              message: "Please input your product color as RGB Code!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Size"
          name="sizes"
          rules={[
            {
              required: true,
              message: "Please input your product size!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Desctiption"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your product price!",
            },
          ]}
        >
          <ReactQuill theme="snow" style={{ backgroundColor: "white" }} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateProductPage;
