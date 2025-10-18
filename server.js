import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


app.get("/me", async (req, res) => {
  try {
    
    const { data } = await axios.get("https://catfact.ninja/fact", {
      timeout: 5000, 
    });

    const response = {
      status: "success",
      user: {
        email: "yusufabdulsamad@gmail.com", 
        name: "Yusuf Abdulsamad",         
        stack: "Node.js/Express",
      },
      timestamp: new Date().toISOString(),
      fact: data?.fact || "Could not fetch cat fact at the moment.",
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(" Error fetching cat fact:", error.message);

    return res.status(500).json({
      status: "error",
      message: "Failed to fetch cat fact",
      timestamp: new Date().toISOString(),
    });
  }
});


app.get("/", (req, res) => {
  res.send("Backend Wizards Stage 0 API is running 🪄");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
