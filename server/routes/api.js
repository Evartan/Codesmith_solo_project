const express = require("express");

const loginsController = require('../controllers/loginsController');

const router = express.Router();

router.get('/', loginsController.getAllLogins, (req, res) =>
  res.status(200).json(res.locals.logins)
);

// can do a get single login route here

router.post("/", loginsController.addLogin, (req, res) =>
  res.status(200).json(res.locals.login)
);

router.delete("/:id", loginsController.deleteLogin, (req, res) => {

    if (res.locals.deleted) {
        return res.status(200).send('Delete successful');
    } else {
        return res.status(400).send("Delete unsuccessful");
    }
});

router.patch("/:id", loginsController.updateLogin, (req, res) => {
    if (res.locals.updated) {
      return res.status(200).json(res.locals.updated);
    } else {
      return res.status(400).send("Update unsuccessful");
    }
});



module.exports = router;