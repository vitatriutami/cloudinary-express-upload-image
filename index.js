const express = require("express")
const app = express()
const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinary = require('cloudinary').v2
const cors = require("cors")

// Configuration 
cloudinary.config({
  cloud_name: "dljcpnl9y",
  api_key: "684145523388965",
  api_secret: "o9rrdPVD23gG762JsQUxNeG2OZI"
});

const { PORT = 8080 } = process.env

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "image-upload"
  }
})

const upload = multer({ storage })
app.use(cors())
// POST http://localhost:8080/api/v1/upload
app.post("/api/v1/upload", upload.single("file"), (req, res) => {
  res.status(200).json(req.file)
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})