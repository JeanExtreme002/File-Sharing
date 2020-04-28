const FileManager = require("../model/fileManager");
const express = require("express");
const path = require("path");

const router = express.Router();
const file = new FileManager("uploaded");


router.get("/", (request, response) => {
    response.sendFile(path.resolve("views", "index.html"));
});


router.get("/download", (request, response) => {
    file.exists() ? response.download(file.info.absolute) : response.sendStatus(404);
});


router.get("/info", (request, response) => {
    file.exists();
    response.send({filename: file.info.filename, size: file.info.size});
});


router.post("/upload", (request, response) => {

    if (request.files && request.files.fileUploaded) {
        file.upload(request.files.fileUploaded);
        response.redirect("/");

    } else {
        response.sendStatus(400);
    }

});


module.exports = router;
