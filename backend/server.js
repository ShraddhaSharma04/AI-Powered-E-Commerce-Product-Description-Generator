const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

let descriptions = [
  {
    id: 1,
    productName: "Himalayan Millet Cookies",
    ingredients: "Millet, jaggery, dry fruits",
    weight: "250g",
    tone: "Health-Focused",
    features: "Healthy, natural, handmade",
    description:
      "Himalayan Millet Cookies are a wholesome snack made with nutritious millet, natural jaggery, and dry fruits. Perfect for health-conscious customers looking for a tasty and natural food option.",
  },
  {
    id: 2,
    productName: "Traditional Mango Pickle",
    ingredients: "Mango, mustard oil, spices",
    weight: "500g",
    tone: "Traditional",
    features: "Homemade taste, spicy, preservative-free",
    description:
      "Traditional Mango Pickle brings authentic homemade flavor with carefully selected mangoes, mustard oil, and Indian spices. It is a perfect companion for everyday meals.",
  },
];

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend server is running successfully",
  });
});

app.get("/api/descriptions", (req, res) => {
  res.status(200).json({
    success: true,
    count: descriptions.length,
    data: descriptions,
  });
});

app.get("/api/descriptions/search", (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({
      success: false,
      message: "Search query is required",
    });
  }

  const results = descriptions.filter((item) =>
    item.productName.toLowerCase().includes(query.toLowerCase())
  );

  res.status(200).json({
    success: true,
    count: results.length,
    data: results,
  });
});

app.get("/api/descriptions/:id", (req, res) => {
  const id = Number(req.params.id);
  const description = descriptions.find((item) => item.id === id);

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
});

app.post("/api/descriptions", (req, res) => {
  const {
    productName,
    ingredients,
    weight,
    tone,
    features,
    description,
  } = req.body;

  if (!productName || !ingredients || !weight || !tone || !features) {
    return res.status(400).json({
      success: false,
      message: "Product name, ingredients, weight, tone, and features are required",
    });
  }

  const newDescription = {
    id: descriptions.length + 1,
    productName,
    ingredients,
    weight,
    tone,
    features,
    description:
      description ||
      `${productName} is a high-quality food product made with ${ingredients}. It is suitable for customers looking for ${features}.`,
  };

  descriptions.push(newDescription);

  res.status(201).json({
    success: true,
    message: "Description created successfully",
    data: newDescription,
  });
});

app.put("/api/descriptions/:id", (req, res) => {
  const id = Number(req.params.id);
  const descriptionIndex = descriptions.findIndex((item) => item.id === id);

  if (descriptionIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Description not found",
    });
  }

  descriptions[descriptionIndex] = {
    ...descriptions[descriptionIndex],
    ...req.body,
  };

  res.status(200).json({
    success: true,
    message: "Description updated successfully",
    data: descriptions[descriptionIndex],
  });
});

app.delete("/api/descriptions/:id", (req, res) => {
  const id = Number(req.params.id);
  const descriptionIndex = descriptions.findIndex((item) => item.id === id);

  if (descriptionIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Description not found",
    });
  }

  descriptions.splice(descriptionIndex, 1);

  res.status(204).send();
});

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});