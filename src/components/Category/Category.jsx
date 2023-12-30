import CategoryItem from "./CategoryItem";
import {  useState } from "react";
import "./Category.css";
import { message } from "antd";
import { useEffect } from "react";

const Category = () => {
  const [categories, setCategories] = useState([]);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/categories`);
        const data = await response.json();

        if (response.ok) {
          setCategories(data);
        } else message.error("Kullanıcı Getirme İşleminde Hata Alındı.");
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, [apiUrl]);
  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>All Categories</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <ul className="category-list">
          {categories.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Category;
