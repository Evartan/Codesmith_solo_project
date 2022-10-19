const Login = require("../models/loginModel");

const loginsController = {};

loginsController.getAllLogins = async (req, res, next) => {
  try {
    const docs = await Login.find({});

    res.locals.logins = docs;

    return next();
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

// loginsController.validateUrl = (req, res, next) => {

//   const { url } = req.body;
//   console.log(typeof url);
//   const isUrlValid = new URL(url);
//   console.log(Boolean(isUrlValid.origin))
//   if (isUrlValid) {
//     return next();
//   } else {

//     return next({ log: 'Not a valid URL' })
//   }


// }

// can do route to get single login here

loginsController.addLogin = async (req, res, next) => {
  try {
    const { url, username, password } = req.body;

    const doc = await Login.create({ url: url, username: username, password: password });

    res.locals.login = doc;

    return next();
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

loginsController.deleteLogin = async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleted = await Login.deleteOne({ _id: id });

    if (deleted.deletedCount) {
      res.locals.deleted = true;

      return next();
    } else {
      res.locals.deleted = false;

      throw new Error("Could not delete student");
    }
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

// update login route
loginsController.updateLogin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { url, username, password } = req.body;

    const update = {};

     if (url) {
       update.url = url;
     }

    if (username) {
      update.username = username;
    }

    if (password) {
      update.password = password;
    }



    // later on might have to switch to other method of finding then update here
    let doc = await Login.findByIdAndUpdate(id, update, {
      returnOriginal: false,
    });

    if (doc) {
      res.locals.updated = doc;
    } else {
      res.locals.updated = false;
    }

    return next();
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

module.exports = loginsController;
