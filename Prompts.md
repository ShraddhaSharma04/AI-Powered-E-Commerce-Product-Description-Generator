# Week 7 Prompt Testing Log

## Project Name
AI-Powered E-Commerce Product Description Generator

## Intern Details
Name: Shraddha Sharma  
Intern ID: TBI-26101440  

## AI Feature
The project uses an AI API to generate professional e-commerce product descriptions for food-processing products.

## System Role
You are an expert e-commerce copywriter for Indian food-processing products.

## Prompt Version 1

### Prompt
Write a product description for:
Product Name: Traditional Mango Pickle
Ingredients: Raw mango, mustard oil, salt, Indian spices
Weight: 500g
Features: Homemade taste, spicy, preservative-free
Tone: Traditional

### Observation
The output was useful but too simple and not properly structured for an e-commerce listing.

---

## Prompt Version 2

### Prompt
Create a professional e-commerce product description using the given product name, ingredients, weight, features, and tone. Keep it customer-friendly and suitable for online selling.

### Observation
The output improved, but it sometimes missed important product details like weight and key features.

---

## Final Prompt Used

### Prompt
You are an expert e-commerce copywriter for Indian food-processing products.

Write one professional product description for the product below.

Product Name: Traditional Mango Pickle  
Ingredients: Raw mango, mustard oil, salt, Indian spices  
Weight: 500g  
Key Features: Homemade taste, spicy, preservative-free  
Tone: Traditional  

Rules:
- Write 70 to 100 words.
- Use simple, customer-friendly language.
- Match the selected tone.
- Include product name, ingredients, weight, and key features naturally.
- Make it suitable for an e-commerce product listing.
- Do not write headings.
- Do not mention fake discounts.
- Do not make unsupported health or medical claims.

### Why This Prompt Was Selected
This prompt was selected because it gives the AI a clear role, includes all product details, controls the word limit, and prevents unsupported claims. It produces a clean and professional product description suitable for e-commerce listings.

## Fallback Handling
A fallback generation method was added so the application still works when the external Gemini API quota is unavailable. This improves reliability and prevents the app from breaking during API quota errors.