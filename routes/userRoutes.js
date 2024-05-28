const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

//---------------------
router.route("/").post(userController.createUser).get(userController.getUser);
router
  .route("/:id")
  .get(userController.getUserid)
  .put(userController.uppdateUser)
  .delete(userController.removeUser);
//----------------------

module.exports = router;
