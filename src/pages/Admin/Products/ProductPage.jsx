import { Table, message, Button, Popconfirm, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "Product Image",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => <img src={imgSrc[0]} alt="Image" width={100} />,
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>{text.current.toFixed(2)}</span>,
    },
    {
      title: "Discount",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>{text.discount} %</span>,
    },

   
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/products/update/${record._id}`)}
          >
            Update
          </Button>
          <Popconfirm
            title="Ürün Sil"
            description="Ürünü silmek istediğinizden emin misiniz?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => deleteProducts(record._id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const deleteProducts = async (productId) => {
    try {
      const response = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Ürün başarıyla silindi");
        setDataSource((prevProducts)=>{
          return prevProducts.filter((product)=> product._id !== productId)
        })
      } else message.error("Silme İşlemi Başarısız");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch(`${apiUrl}/api/categories`),
          fetch(`${apiUrl}/api/products`),
        ]);

        if (!categoriesResponse.ok || !productsResponse.ok)
          message.error("An occured Error");

        const [categoriesData, productsData] = await Promise.all([
          categoriesResponse.json(),
          productsResponse.json(),
        ]);

        const productWithCategories = productsData.map((product) => {
          const categoryId = product.category;
          const category = categoriesData.find(
            (item) => item._id === categoryId
          );

          return {
            ...product,
            categoryName: category ? category.name : "",
          };
        });

        setDataSource(productWithCategories)
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [apiUrl]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default ProductPage;
