const express = require("express")
const { getallproduct, createproduct, updateproduct,getproductReviews, deletproduct, getproductdelails ,DeleteReview} = require("../controllers/productcontroller");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const { createproductreview } = require("../controllers/productcontroller")

const router = express.Router();

router.route("/products").get(getallproduct);

router
    .route("/admin/product/new")
    .post(isAuthenticated, authorizeRoles("admin"), createproduct);


router
    .route("/admin/product/:id").put(updateproduct)
    .put(isAuthenticated, authorizeRoles("admin"), updateproduct)
    .delete(isAuthenticated, authorizeRoles("admin"), deletproduct)




router.route("/product/:id").get(getproductdelails);

router.route("/review").put(isAuthenticated, createproductreview);


router.route("/reviews").get(getproductReviews).delete(isAuthenticated, DeleteReview)

module.exports = router


