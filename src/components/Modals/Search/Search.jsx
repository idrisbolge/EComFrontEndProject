import { message } from "antd";
import "./Search.css";
import PropTypes from "prop-types";
import { useState } from "react";
import Link from "antd/es/typography/Link";

const Search = ({ isSearchShow, setIsSearchShow }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [searchResults, setSearchResults] = useState();
  const handleSearch = async (e) => {
    e.preventDefault();
    const productName = e.target[0].value;
    try {
      const res = await fetch(`${apiUrl}/api/products/search/${productName}`);

      if (!res.ok) {
        message.error("Error");
        return;
      }

      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setIsSearchShow(false);
    setSearchResults(null);
  };


  return (
    <div className={`modal-search ${isSearchShow ? "show" : ""}`}>
      <div className="modal-wrapper">
        <h3 className="modal-title">Search for products</h3>
        <p className="modal-text">
          Start typing to see products you are looking for.
        </p>
        <form className="search-form" onSubmit={handleSearch}>
          <input type="text" placeholder="Search a product" />
          <button>
            <i className="bi bi-search"></i>
          </button>
        </form>
        <div className="search-results">
          <div className="search-heading">
            <h3>RESULTS FROM PRODUCT</h3>
          </div>
          <div
            className="results"
            style={{
              display: `${
                searchResults?.length === 0 || !searchResults ? "flex" : "grid"
              }`,
            }}
          >
            {!searchResults && (
              <b
                className="result-item"
                style={{
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                Ürün Ara...
              </b>
            )}
            {searchResults?.length === 0 && (
              <a
                href="#"
                className="result-item"
                style={{
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                😔Aradığınız Ürün Bulunamadı😔
              </a>
            )}
            {searchResults?.length > 0 &&
              searchResults?.map((resultItem) => (
                
                <Link
                  to={`product/${resultItem._id}`}
                  className="result-item"
                  key={resultItem._id}
                >
                  <img
                    src={resultItem.img[0]}
                    className="search-thumb"
                    alt=""
                  />
                  <div className="search-info">
                    <h4>{resultItem.name}</h4>
                    <span className="search-sku">SKU: PD0016</span>
                    <span className="search-price">
                      ${resultItem.price.current.toFixed(2)}
                    </span>
                  </div>
                  </Link>
              ))}
          </div>
        </div>
        <i
          className="bi bi-x-circle"
          id="close-search"
          onClick={handleCloseModal}
        ></i>
      </div>
      <div
        className="modal-overlay"
        onClick={handleCloseModal}
      ></div>
    </div>
  );
};

export default Search;

Search.propTypes = {
  isSearchShow: PropTypes.bool,
  setIsSearchShow: PropTypes.func,
};
