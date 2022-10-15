const express = require("express");
const router = express.Router();
const secure = require("../middlewares/secure.mid.js");
const {tables} = require('../controllers');

router.post("/:id", secure.isAuthenticated,secure.isZoneOwnedByUser, tables.create);
router.get("/:zoneId", secure.isAuthenticated, tables.detail);
router.patch("/:id", secure.isAuthenticated, secure.isTableOwnedByUser, tables.update);
router.delete(
    "/:id",
    secure.isAuthenticated,
    secure.isTableOwnedByUser,
    tables.delete
  );

module.exports = router;
