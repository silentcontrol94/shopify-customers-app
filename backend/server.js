require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

app.get("/", (req, res) => {
  res.send("Shopify Customers API is running!");
});

app.get("/favicon.ico", (req, res) => {
  res.status(204);
});

app.post("/customers", async (req, res) => {
  let { updated_at_min } = req.body; 
  if (!updated_at_min) {
      updated_at_min = "2024-01-01T00:00:00Z";
  }
  const query = `
    {
      customers(first: 50, query: "updated_at:>=${updated_at_min}") {
        edges {
          node {
            id
            firstName
            lastName
            email
            updatedAt
          }
        }
      }
    }`;

  try {
    const response = await axios.post(
      `https://${SHOPIFY_STORE_URL}/admin/api/2023-10/graphql.json`,
      { query },
      {
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Müşteri verileri alınamadı", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server ${port} portunda çalışıyor!`);
});
