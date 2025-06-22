import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to the database
connectDB();

// Middleware to parse JSON body
app.use(express.json());

// Register API routes
app.use("/api/products", productRoutes);

// Root route (only for test or dev)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  // Serve static files from the frontend build directory
  app.use(express.static(path.join(__dirname, "/frontend/front-end-app/dist")));

  // All other routes should serve the frontend's index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "front-end-app", "dist", "index.html"));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server started at http://localhost:${PORT}`);
});
