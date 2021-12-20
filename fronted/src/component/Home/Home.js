import React, { useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const {
    loading,
    error,
    products,
    // productcount
  } = useSelector((state) => state.products);

  useEffect(() => {
    console.log("Errors: ", error);
    if (error) {
      return alert.error(error);
      // dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Ecoomerse" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product, i) => (
                <Product key={i} product={product} />
              ))}
          </div>
        </>
      )}
      )
    </>
  );
};
export default Home;
