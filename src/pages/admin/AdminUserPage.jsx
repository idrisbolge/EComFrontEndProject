import { Table, message,Tag, Button, Popconfirm } from "antd";
import { useCallback, useEffect, useState } from "react";

const AdminUserPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/users`);
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
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (  role) => (
        <Tag color="red" key={role}>
            {role.toUpperCase()}
        </Tag>
            

      ),
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (imgSrc) => (
        <img
          src={imgSrc}
          alt="Avatar"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          }}
        />
      ),
    },
    {
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        render : (_,record)=>(
            <Popconfirm
                title="Kullanıcı Sil"
                description="Kullanıcıyı silmek istediğinizden emin misiniz?"
                okText="Evet"
                cancelText="Hayır"
                onConfirm={()=>deleteUser(record.email)}
            >
                <Button type="primary" danger>Delete</Button>
            </Popconfirm>
        )
      },
  ];

  const deleteUser= async (userEmail)=>{
    try {
        const response = await fetch(`${apiUrl}/api/users/${userEmail}`,{
            method:"DELETE"
        });
  
        if (response.ok) {
            message.success("Kullanıcı başarıyla silindi")
          fetchUsers();
        } else message.error("Silme İşlemi Başarısız");
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default AdminUserPage;
