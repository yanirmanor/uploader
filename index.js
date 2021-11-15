const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const userUpload = require("./routes/index");

app.use(express.static(`${__dirname}/public`));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userUpload);

app.listen(3001, () => {
  console.log("listening on port 3001");
});
