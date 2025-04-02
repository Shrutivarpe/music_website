import express from "express";
import cors from "cors";
import pkg from "pg"; // Import PostgreSQL package
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config(); // Load environment variables

const { Pool } = pkg; // Destructure Pool from pg
const app = express();
const PORT = 5000;

// PostgreSQL Connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "World",
  password: "Shruu099*", // Move this to .env for security
  port: 5432,
});

// Get the directory name for proper path handling
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve music files from your local folder
app.use("/music", express.static(path.join("C:/Users/Shruti Varpe/Music")));

app.use(cors());
app.use(express.json());

// API to fetch songs from database
app.get("/songs", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM songs");
    res.json(result.rows);
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
