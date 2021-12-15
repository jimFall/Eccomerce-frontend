const express = require("express")

const { neworder,singalorder ,myorders,getallorders,updateorder,deleteorder} = require("../controllers/ordercontroll");

const router = express.Router();

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticated, neworder);

router.route("/order/:id").get(isAuthenticated,singalorder );

router.route("/orders/me").get(isAuthenticated,myorders)

router.route("/admin/orders").get(isAuthenticated,authorizeRoles('admin'),getallorders)

router.route("/admin/order/:id").put(isAuthenticated,authorizeRoles('admin'),updateorder)
.delete(isAuthenticated,authorizeRoles('admin'),deleteorder)


module.exports = router