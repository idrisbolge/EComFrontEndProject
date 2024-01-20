import { Table, message,  } from "antd";
import {  useEffect, useState } from "react";



const OrderPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const MY_SECRET_KEY = import.meta.env.VITE_API_STRIPE_SECRET_KEY;


  const columns = [
    {
      title: "Müşteri Email",
      dataIndex: "receipt_email",
      key: "receipt_email"
    },
    {
      title: "Sipariş Fiyatı",
      dataIndex: "amount",
      key: "amount",
      render: (record) => <b>${(record / 100).toFixed(2)}</b>,
    }
  ];



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.stripe.com/v1/payment_intents`,{
          method : "GET",
          headers:{
            Authorization : `Bearer ${MY_SECRET_KEY}`
          }
        });
        const {data} = await response.json();
        console.log({data})
        if (response.ok) {
          setDataSource(data);
        } else message.error("Kullanıcı Getirme İşleminde Hata Alındı.");
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [MY_SECRET_KEY]);
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record)=>record.id}
      loading={loading}
    />
  );
};

export default OrderPage;
