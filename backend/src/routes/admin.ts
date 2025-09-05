import express from "express";
import dotenv from "dotenv";
dotenv.config();

const adminRouter = express.Router();

const url = process.env.INTERN_URL!;
const apiKey = process.env.RAPIDAPIKEY!;
const apiHost = process.env.RAPIDAPIHOST!;

adminRouter.get("/internships", async (req, res) => {
  try {
    console.log("Fetching from RapidAPI:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": apiHost,
      },
    });

    console.log("RapidAPI status:", response.status);

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch from RapidAPI" });
    }

    const data = await response.json();
    console.log("Received data keys:", Object.keys(data));

    return res.json(data);
  } catch (error) {
    console.error("Error fetching internships:", error);
    return res.status(500).json({ error: "Failed to fetch internships" });
  }
});

export default adminRouter;
