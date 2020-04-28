const bodyParser = require("body-parser");
const express = require("express");
const fileUpload = require("express-fileupload");
const router = require("./controller/routes");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Connected on port " + PORT);
});