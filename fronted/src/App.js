import './App.css';
import Header from './component/layout/Header/Header.js';
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import { BrowserRouter as Router,Route } from 'react-router-dom'
import WebFont from "webfontloader";
import React from "react";
import Search from './component/Home/Search.js';
import Products from './component/Home/Products.js';
import ProductDetails from './component/product/ProductDetails.js';


function App() {

 React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });


  }, []);

  return (
    <Router>
      <Header /> 
      <Route exact path="/" component={Home}/>
      <Route exact path="/product/:id" component={ProductDetails}/>
      <Route exact path="/Products" component={Products}/>
      <Route exact path="/Products/:keyword" component={Products}/>
      <Route exact path="/Search" component={Search}/>
      <Footer/>
    </Router>
  );
}

export default App;
