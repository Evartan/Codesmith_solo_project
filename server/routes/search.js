const express = require("express");

const searchController = require("../controllers/searchController");

const router = express.Router();


router.get("/:query", searchController.getMatchingLogins, (req, res) =>
  res.status(200).json(res.locals.logins)
);

module.exports = router;