const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();

// const app = express();

// app.use(fileUpload());

// Upload Endpoint
router.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  console.log(req.files.file)
  const imageName = req.files.file[1].data.toString();
  const extension = file[0].name.split(".").pop();
  var finalName = imageName.concat(".", extension);
  console.log(__dirname)
  console.log(process.cwd)
  file[0].mv(`F:/pankaj/voting project/client/public/uploads/${finalName}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});
module.exports = router;
