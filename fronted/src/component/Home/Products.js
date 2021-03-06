import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { 
  
  // clearErrors,
  
  getProduct } from "../../actions/ProductAction";
import Typography from "@material-ui/core/Typography";
import Loader from "../layout/loader/loader";
import ProductCard from "./ProductCard.js";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
// import { useAlert } from "react-alert";
// import MetaData from "../layout/MetaData";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [price, setprice] = useState([0, 2500]);

  const [catergory, setCatergory] = useState("");

  const [ratings, setRatings] = useState(0);


  const {
    products,
    loading,
    // error,
    productsCount,
    resultperpage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, catergory, ratings));
  }, [dispatch, keyword, currentPage, price, catergory, ratings]);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newprice) => {
    setprice(newprice);
  };
  let count = filteredProductsCount;
  
  return (
    <Fragment>
      {" "}
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="productHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />


            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((catergory,i) => (
                <li
                  className="category-link"
                  key={i}
                  onClick={() => setCatergory(catergory)}
                >
                {catergory}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultperpage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultperpage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}{" "}
    </Fragment>
  );
};
export default Products;
