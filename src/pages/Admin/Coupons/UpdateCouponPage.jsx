import { Button, Form, Input, InputNumber, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateCouponPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const couponId = params.id;

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const response = await fetch(`${apiUrl}/api/coupon/${couponId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if(response.ok)
        message.success("Coupon Updated successful")
      else
        message.error("Coupon Updated unsuccesfull") 


    } catch (error) {
      console.log(error);
    }
    finally{
        setLoading(false)
    }
  };

  useEffect(() => {
    const fetchSingleCoupon = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/coupon/${couponId}`);
        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }

        const data = await response.json();
        if (data) {
          form.setFieldsValue({
            code: data.code,
            discountPercent: data.discountPercent,
          });
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchSingleCoupon();
  }, [apiUrl, couponId, form]);
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
        label="Coupon Discount"
        name="discountPercent"
        rules={[
          {
            required: true,
            message: "Please input your coupon discount percent!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Update
      </Button>
    </Form>
    </Spin>
  );
};

export default UpdateCouponPage;
