const express = require("express");
const multer = require("multer");

const app = express();

// cấu hình lưu file
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const uploadManyFiles = multer({ storage: storage }).array("many-files", 17);

// form
app.get("/", (req, res) => {
    res.send(`
        <form action="/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="many-files" multiple />
            <button type="submit">Upload</button>
        </form>
    `);
});

// upload
app.post("/upload", (req, res) => {
    uploadManyFiles(req, res, (err) => {
        if (err) return res.send("Lỗi upload");
        res.send("Upload nhiều file thành công");
    });
});

app.listen(8017, () => {
    console.log("Server chạy tại http://localhost:8017");
});