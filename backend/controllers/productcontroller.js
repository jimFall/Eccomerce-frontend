const product = require("../models/productmodel");
const ErrorHandler = require("../utils/errorhander");
const catchAsyncError = require("../middleware/catchasyncerror");
const ApiFeatures = require("../utils/apifeatures");

//create product--Admin

exports.createproduct = catchAsyncError(async (req, res, next) => {
  req.body.User = req.User.id;

  // console.log("request: ", req.body)
  const Product = await product.create(req.body);
  res.status(201).json({
    success: true,
    Product,
  });
});
//get all product
exports.getallproduct = catchAsyncError(async (req, res, next) => {
  // return next(new ErrorHandler("Product not Found", 404));

  const resultperpage = 8;
  const productcount = await product.countDocuments();

  const ApiFeature = new ApiFeatures(product.find(), req.query)
    .search()
    .filter()
    .pagination(resultperpage);

  //chahe to keyword bhi use krskte h

  const Products = await ApiFeature.query;

  res.status(200).json({
    success: true,
    Products,
    productcount,
    resultperpage,
  });
});

//get product datalis

exports.getproductdelails = catchAsyncError(async (req, res, next) => {
  const Product = await product.findById(req.params.id);

  // console.log(Product)

  if (!Product) {
    return next(new ErrorHandler("Product not Found", 404));
  }
  console.log("getproductdetalies");

  res.status(200).json({
    success: true,
    Product,
  });
});

//update product---admin

exports.updateproduct = catchAsyncError(async (req, res, next) => {
  let Product = await product.findById(req.params.id);

  if (!Product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  Product = await product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    Product,
  });
});
//delet product

exports.deletproduct = catchAsyncError(async (req, res, next) => {
  const Product = await product.findById(req.params.id);

  if (!Product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  await Product.remove();

  res.status(200).json({
    success: true,
    message: "product deleted succesfully",
  });
});

//create new review and update the review

exports.createproductreview = catchAsyncError(async (req, res, next) => {
  try {
  } catch (error) {}
  const { rating, comment, productId } = req.body;

  const review = {
    User: req.User._id,
    name: req.User.name,
    rating: Number(rating),
    comment,
  };

  const Product = await product.findById(productId);

  //jab User ne review kr liya hai tab
  const isReviewed = Product.reviews.find(
    (rev) => rev.User.toString() === req.User._id.toString()
  );

  console.log(isReviewed, "------");

  if (isReviewed) {
    Product.reviews.forEach((review) => {
      if (review.User.toString() === req.User._id.toString()) {
        review.rating = rating;
        review.comment = comment;
      }
    });
  } else {
    //jab review ni kiya hai to direact push kr dege review ko

    Product.reviews.push(review);
    Product.numofReviews = Product.reviews.length;
  }
  //4,5,5,2=16 and then 16/4=4
  let avrage = 0;
  //ye jo alg se product ke ander jo rating h bo h reviews wali ni

  Product.reviews.forEach((rev) => {
    avrage = avrage + rev.rating;
  });
  Product.ratings = avrage / Product.reviews.length;

  await Product.save({ validateBeforesave: false });

  res.status(200).json({
    success: true,
  });
});

//Get all product reviews

exports.getproductReviews = catchAsyncError(async (req, res, next) => {
  const Product = await product.findById(req.query.id);

  if (!Product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: Product.reviews,
  });
});

//Delet reviews

exports.DeleteReview = catchAsyncError(async (req, res, next) => {
  const Product = await product.findById(req.query.ProductId);

  if (!Product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  //isme bo review hai jo hme delet nhi krne h or ye bo id h jo review delet krna h uski id h

  const reviews = Product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.Id.toString()
  );

  let avrage = 0;

  reviews.forEach((rev) => {
    avrage = avrage + rev.rating;
  });

  const ratings = avrage / reviews.length;

  const numofReviews = reviews.length;

  await product.findByIdAndUpdate(
    req.query.ProductId,
    {
      reviews,

      ratings,

      numofReviews,
    },

    {
      new: true,

      runValidators: true,

      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
  });
});
