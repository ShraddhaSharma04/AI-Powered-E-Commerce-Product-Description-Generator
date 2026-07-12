const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const Description = require("./models/Description");
const requireAuth = require("./middleware/requireAuth");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

// Health check endpoint - public route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend server and database are running successfully",
  });
});

// GET all descriptions - protected route
app.get("/api/descriptions", requireAuth, async (req, res, next) => {
  try {
    const descriptions = await Description.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: descriptions.length,
      data: descriptions,
    });
  } catch (error) {
    next(error);
  }
});

// SEARCH descriptions - protected route
app.get("/api/descriptions/search", requireAuth, async (req, res, next) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const results = await Description.find({
      productName: { $regex: query, $options: "i" },
    });

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    next(error);
  }
});

// GET single description - protected route
app.get("/api/descriptions/:id", requireAuth, async (req, res, next) => {
  try {
    const description = await Description.findById(req.params.id);

    if (!description) {
      return res.status(404).json({
        success: false,
        message: "Description not found",
      });
    }

    res.status(200).json({
      success: true,
      data: description,
    });
  } catch (error) {
    next(error);
  }
});

// POST create description - protected route
app.post("/api/descriptions", requireAuth, async (req, res, next) => {
  try {
    const {
      productName,
      ingredients,
      weight,
      tone,
      features,
      description,
    } = req.body || {};

    if (!productName || !ingredients || !weight || !tone || !features) {
      return res.status(400).json({
        success: false,
        message:
          "Product name, ingredients, weight, tone, and features are required",
      });
    }

    const newDescription = await Description.create({
      productName,
      ingredients,
      weight,
      tone,
      features,
      description:
        description ||
        `${productName} is a high-quality food product made with ${ingredients}. It is suitable for customers looking for ${features}.`,
    });

    res.status(201).json({
      success: true,
      message: "Description created successfully",
      data: newDescription,
    });
  } catch (error) {
    next(error);
  }
});

// PUT update description - protected route
app.put("/api/descriptions/:id", requireAuth, async (req, res, next) => {
  try {
    const updatedDescription = await Description.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedDescription) {
      return res.status(404).json({
        success: false,
        message: "Description not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Description updated successfully",
      data: updatedDescription,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE description - protected route
app.delete("/api/descriptions/:id", requireAuth, async (req, res, next) => {
  try {
    const deletedDescription = await Description.findByIdAndDelete(
      req.params.id
    );

    if (!deletedDescription) {
      return res.status(404).json({
        success: false,
        message: "Description not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Description deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);

  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});