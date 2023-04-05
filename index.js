const express = require("express")
const app = express()
const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinary = require('cloudinary').v2
const cors = require("cors")

// Configuration 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const { API_PORT } = process.env;
const PORT = process.env.PORT || API_PORT;

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "image-upload"
  }
})

const upload = multer({ storage })
app.use(cors())
// POST http://localhost:4001/api/v1/upload
app.post("/api/v1/upload", upload.single("file"), (req, res) => {
  res.status(200).json(req.file)
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})