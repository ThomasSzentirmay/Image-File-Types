const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/convert", upload.single("imageFile"), (req, res) => {
  const format = req.body.format;

  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const inputFile = req.file.path;
  const outputFile = `uploads/converted.${format}`;

  convertImage(inputFile, outputFile, format)
    .then(() => {
      res.sendFile(path.join(__dirname, "public", "converted.html"));
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred during conversion.");
    });
});

async function convertImage(inputPath, outputPath, format) {
  await sharp(inputPath).toFormat(format).toFile(outputPath);
}

const port = 3333;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
