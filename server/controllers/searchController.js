const Login = require("../models/loginModel");


const searchController = {};

searchController.getMatchingLogins = async (req, res, next) => {
  const query = req.params.query;

  const regex = new RegExp(query, 'i')

  try {
    const docs = await Login.find({
      $or: [{ url: regex }, { username: regex }, { password: regex }],
    });

    res.locals.logins = docs;

    return next();
  } catch (e) {
    console.log(e.message);
    return next(e);
  }
};


module.exports = searchController;