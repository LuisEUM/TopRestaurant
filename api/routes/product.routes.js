const express = require("express");
const router = express.Router();
const secure = require("../middlewares/secure.mid.js");
const {products} = require('../controllers');


router.get("/", secure.isAuthenticated ,  products.list);
router.get("/:id", secure.isAuthenticated ,  products.detail);
router.post("/:menuId", secure.isAuthenticated ,  products.create);
router.patch("/:id", secure.isAuthenticated ,secure.isproductOwnedByUser,  products.update);
router.delete("/:id", secure.isAuthenticated ,secure.isproductOwnedByUser,  products.delete);


module.exports = router;
