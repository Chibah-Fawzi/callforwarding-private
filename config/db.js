const mongoose = require("mongoose");

require("dotenv").config();

var MONGO_URI;
const MONGO_NAME = process.env.MONGO_NAME;

if (process.env.NODE_ENV === "production") {
  MONGO_URI = process.env.MONGO_URI;
} else {
  MONGO_URI = process.env.LOCAL_MONGO_URI;
}

mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log(`MongoDB connected to ${MONGO_NAME}`))
  .catch((err) =>
    console.error(
      `Failed to connected to MongoDb uri ${MONGO_URI} -  ${err.message}`
    )
  );

module.exports = mongoose;
