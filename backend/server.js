import express from "express";
import dotenv from "dotenv"
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js"

// Load environment variables
dotenv.config();

// Check the current environment

const app = express();
const PORT = process.env.PORT || 5000;

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON body
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/front-end-app/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "front-end-app", "dist", "index.html"));
  });

  app.get("/", (req, res) => {
  res.send("API is running...");
});
}

// Start server and connect DB
app.listen(PORT, () => {
     connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});


