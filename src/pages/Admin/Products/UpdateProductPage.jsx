import { Button, Form, Input, InputNumber, Select, Spin, message } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";

const CreateProductPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [singleProducts, setSingleProducts] = useState([]);
  const [form] = Form.useForm();
  const params = useParams();
  const productId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, singleProductsResponse] = await Promise.all([
          fetch(`${apiUrl}/api/categories`),
          fetch(`${apiUrl}/api/products/${productId}`),
        ]);

        if (!categoriesResponse.ok || !singleProductsResponse.ok)
          message.error("An occured Error");

        const [categoriesData, singleProductsData] = await Promise.all([
          categoriesResponse.json(),
          singleProductsResponse.json(),
        ]);

        setCategories(categoriesData);
        setSingleProducts(singleProductsData);

        if (singleProductsData) {
          form.setFieldsValue({
            name: singleProductsData.name,
            category: singleProductsData.category,
            current: singleProductsData.price.current,
            discount: singleProductsData.price.discount,
            description: singleProductsData.description,
            img: singleProductsData.img.join("\n"),
            colors: singleProductsData.colors.join("\n"),
            sizes: singleProductsData.sizes.join("\n"),
          });
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
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

      const response = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "PUT",
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
        message.success("Product updated successful");
      } else message.error("Product updated unsuccesfull");
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
          Update
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateProductPage;
