import { Table, message, Button, Popconfirm, Space } from "antd";
import { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const CouponPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchCoupons = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupon`);
      const data = await response.json();

      if (response.ok) {
        setDataSource(data);
      } else message.error("Kullanıcı Getirme İşleminde Hata Alındı.");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [apiUrl]);

  const columns = [
    {
      title: "Coupon Code",
      dataIndex: "code",
      key: "code"
    },
    {
      title: "Discount(%)",
      dataIndex: "discountPercent",
      key: "discountPercent",
      render: (text) => <b>{text} %</b>,
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (record) => {
        return <p>{moment(record).format("DD-MM-YYYY HH:mm:ss")}</p>;
      },
    },
    {
      title: "Update Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (record) => {
        return <p>{moment(record).format("DD-MM-YYYY HH:mm:ss")}</p>;
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={()=>navigate(`/admin/coupons/update/${record._id}`)}>Update</Button>
          <Popconfirm
            title="Kupon Sil"
            description="Kuponu silmek istediğinizden emin misiniz?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => deleteCoupon(record._id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const deleteCoupon = async (categoryId) => {
    try {
      const response = await fetch(`${apiUrl}/api/coupon/${categoryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Kupon başarıyla silindi");
        fetchCoupons();
      } else message.error("Silme İşlemi Başarısız");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default CouponPage;
