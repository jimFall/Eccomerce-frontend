const express = require('express')
const { rigisteruser, LoginUser, logout, forgetpassword, resetpassword, getuserdetales, updateuserprofile, changeUserpassword,GetAllUser,getSingalUser,updateuserRole,DeleteUser } = require('../controllers/userController');
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(rigisteruser);

router.route("/login").post(LoginUser)

router.route("/password/forget").post(forgetpassword)

router.route("/password/reset/:token").put(resetpassword)

router.route("/logout").get(logout)

router.route("/me").get(isAuthenticated, getuserdetales)

router.route("/password//update").put(isAuthenticated, changeUserpassword)

router.route("/me/update").put(isAuthenticated, updateuserprofile)

router.route("/admin/user").get(isAuthenticated,authorizeRoles("admin"),GetAllUser)

router.route("/admin/user/:id").get(isAuthenticated,authorizeRoles("admin"),getSingalUser)

.put(isAuthenticated,authorizeRoles("admin"),updateuserRole)

.delete(isAuthenticated,authorizeRoles("admin"),DeleteUser)

module.exports = router;


