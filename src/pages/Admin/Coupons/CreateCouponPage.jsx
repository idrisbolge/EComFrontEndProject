import { Button, Form, Input, InputNumber, Spin, message } from "antd";
import { useState } from "react";

const CreateCouponPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [form]  = Form.useForm();
  
  

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const response = await fetch(`${apiUrl}/api/coupon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if(response.ok){
        message.success("Coupon created successful")
        form.resetFields();
      }
        
      else
        message.error("Coupon created unsuccesfull") 


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
        label="Coupon Code"
        name="code"
        rules={[
          {
            required: true,
            message: "Please input your coupon code!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Coupon Discount(%)"
        name="discountPercent"
        rules={[
          {
            required: true,
            message: "Please input your coupon discountPercent!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Create
      </Button>
    </Form>
    </Spin>
  );
};

export default CreateCouponPage;