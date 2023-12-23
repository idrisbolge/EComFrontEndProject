import { Table, message, Button, Popconfirm, Space } from "antd";
import { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories`);
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
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => <img src={imgSrc} alt="Image" width={100} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
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
          <Button type="primary" onClick={()=>navigate(`/admin/categories/update/${record._id}`)}>Update</Button>
          <Popconfirm
            title="Kategori Sil"
            description="Kategoriyi silmek istediğinizden emin misiniz?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => deleteCategory(record._id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Kullanıcı başarıyla silindi");
        fetchCategories();
      } else message.error("Silme İşlemi Başarısız");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default CategoryPage;
