const mongoose = require("mongoose");
require("mongoose-type-url");

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "logins"
  })
  .then(() => console.log("Connected to Mongo DB."))
  .catch((err) => console.log(err));

  const Schema = mongoose.Schema;

  const loginsSchema = new Schema({
    url: { type: mongoose.SchemaTypes.Url, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  });

  const Login = mongoose.model("logins", loginsSchema);

  module.exports = Login;
