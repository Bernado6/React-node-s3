import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import multer from "multer";
import { uploadToS3 } from "./s3.mjs";

const app = express();

const PORT = process.env.PORT || 4000;

const storage = multer.memoryStorage()
const upload = multer({storage: storage});

app.use(
  cors({
    origin: "*",
  })
);
app.use(json());

app.post("/images", upload.single('image'), (req, res) => {
  const {file} = req;
  const userId = req.headers["x-user-id"];

  console.log(file)
  if (!file || !userId) return res.status(400).send({ message:"Bad Request: Missing file or user id" })

  const {error, key} = uploadToS3({file, userId});
  if (error) return res.status(500).json({message: error.message});

  res.status(201).send({Message: "File uploaded successfully", key})

});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
