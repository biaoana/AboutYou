const express = require("express");
const axios = require("axios");
const https = require("https");
const path = require("path");
const cookie = require("cookie-parser");
const PORT = process.env.PORT || 3000;
var action = require('./routes/cartWishlist');
var products = require('./routes/products');
var user = require('./routes/user');
const app = express();
var lastPage;
app.use(express.static(path.join(__dirname, "public")));
const bodyParser = require("body-parser");
const { SSL_OP_PKCS1_CHECK_1 } = require("constants");
const { response } = require("express");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookie());
app.use('/', action);
app.use('/', products);
app.use('/', user);

var element;
const base_url = "https://osf-digital-backend-academy.herokuapp.com/api/";
const secretKey =
  "$2a$08$lML.B7qZIg21DSluOUPRKecTrsl0lQ0O/j5FXnQZXZGoB8pmSRHu6";
app.set("view engine", "pug");

app.get("/", (req, res) => {
  let url = `${base_url}/categories?secretKey=${secretKey}`;
  axios({
    method: "get",
    url,
  })
    .then(function (response) {
      item = JSON.parse(JSON.stringify(response.data));
      res.render("index", { items: item });
    })
    .catch(function (error) {
      console.log(error);
    });
});



app.listen(PORT, () => {
  console.log("Your application is running");
});
