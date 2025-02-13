
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "./public/uploads";
    // Create the uploads directory if it doesn't exist
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName); // Using uuid for a unique file name
  },
});

// Configure multer
const upload = multer({ storage });

// Middleware function to handle multer in Next.js
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

// Handle POST requests for image uploads
export async function POST(req) {
  try {
    // Run the middleware (multer) to handle the file upload
    const res = new Response();
    console.log("req.file",req.file)
    console.log("req.image",req.image)
    await runMiddleware(req, res, upload.single("image")); // 'image' is the field name in the form

    // After the file is uploaded
    const file = req.file;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Return file upload success response
    return NextResponse.json({
      message: "File uploaded successfully",
      filePath: `/uploads/${file.filename}`,
    });
  } catch (error) {
    console.error("Error during file upload:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
