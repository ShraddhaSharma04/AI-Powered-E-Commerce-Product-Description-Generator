const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const requireAuth = require("../Middleware/requireAuth");

const router = express.Router();

function validateProductInput(productData) {
  const { productName, ingredients, weight, features, tone } =
    productData || {};

  if (!productName || !ingredients || !weight || !features || !tone) {
    return "Product name, ingredients, weight, features, and tone are required.";
  }

  return "";
}

function createFallbackDescription(productData) {
  const { productName, ingredients, weight, features, tone } = productData;

  if (tone === "Traditional") {
    return `${productName} brings the authentic taste of Indian food traditions to your table. Made with ${ingredients}, this ${weight} pack is prepared for customers who enjoy rich flavor, homemade taste, and trusted quality. Its key features include ${features}, making it suitable for everyday meals, family dining, and festive food moments. Carefully described for an e-commerce listing, this product helps buyers quickly understand its value, taste, quantity, and freshness before purchase.`;
  }

  if (tone === "Health-Focused") {
    return `${productName} is a thoughtfully prepared food product made with ${ingredients}. This ${weight} pack is ideal for customers looking for a simple, reliable, and quality-focused option for daily use. With features such as ${features}, it offers a clear and practical choice for modern buyers. The description highlights the product’s ingredients, pack size, and benefits in a customer-friendly way, making it suitable for online food and grocery listings.`;
  }

  return `${productName} is a premium food product designed for customers who value quality, taste, and convenience. Made with ${ingredients}, this ${weight} pack offers a refined choice for online shoppers. Its key features include ${features}, helping customers understand the product clearly before purchase. With a polished e-commerce style, this description presents the product in a professional way and makes it suitable for food processing brands, grocery stores, and digital product listings.`;
}

router.post("/generate-description", requireAuth, async (req, res) => {
  try {
    const validationError = validateProductInput(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        success: true,
        message:
          "Fallback description generated because Gemini API key is missing.",
        source: "fallback",
        data: {
          description: createFallbackDescription(req.body),
        },
      });
    }

    const { productName, ingredients, weight, features, tone } = req.body;

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite",
    });

    const prompt = `
You are an expert e-commerce copywriter for Indian food-processing products.

Write one professional product description for the product below.

Product Name: ${productName}
Ingredients: ${ingredients}
Weight: ${weight}
Key Features: ${features}
Tone: ${tone}

Rules:
- Write 70 to 100 words.
- Use simple, customer-friendly language.
- Match the selected tone.
- Include product name, ingredients, weight, and key features naturally.
- Make it suitable for an e-commerce product listing.
- Do not write headings.
- Do not mention fake discounts.
- Do not make unsupported health or medical claims.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiDescription = response.text();

    if (!aiDescription || !aiDescription.trim()) {
      return res.status(200).json({
        success: true,
        message:
          "Fallback description generated because Gemini returned empty output.",
        source: "fallback",
        data: {
          description: createFallbackDescription(req.body),
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "AI description generated successfully using Gemini.",
      source: "gemini",
      data: {
        description: aiDescription.trim(),
      },
    });
  } catch (error) {
    console.error("Gemini AI error:", error.message);

    return res.status(200).json({
      success: true,
      message:
        "Fallback description generated because Gemini quota is unavailable.",
      source: "fallback",
      data: {
        description: createFallbackDescription(req.body),
      },
    });
  }
});

module.exports = router;