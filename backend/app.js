import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*", methods: "GET,POST,OPTIONS", allowedHeaders: "Content-Type" }));
app.use(express.static('public'));


app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(204);
});

app.get('/meals', async (req, res) => {
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
});

app.post("/orders", async (req, res) => {
  console.log("Received request body:", req.body); // Debugging output

  const orderData = req.body.order;

  await new Promise((resolve) => setTimeout(resolve,1000));

  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return res.status(400).json({ message: "Missing order data." });
  }

  if (
    !orderData.customer?.email ||
    !orderData.customer.email.includes("@") ||
    !orderData.customer.name?.trim() ||
    !orderData.customer.street?.trim() ||
    !orderData.customer["postal-code"]?.trim() ||
    !orderData.customer.city?.trim()
  ) {
    return res.status(400).json({ message: "Missing required fields: Email, name, street, postal code, or city." });
  }

  try {
    let orders;
    try {
      const ordersFile = await fs.readFile("./data/orders.json", "utf8");
      orders = ordersFile.trim() ? JSON.parse(ordersFile) : []; // handle empty file
    } catch (err) {
      orders = []; // ff file doesn't exist, initialize it
    }

    const newOrder = { ...orderData, id: (Math.random() * 1000).toString() };
    orders.push(newOrder);

    await fs.writeFile("./data/orders.json", JSON.stringify(orders, null, 2)); // Pretty-print JSON
    res.status(201).json({ message: "Order created!" });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Could not save order" });
  }
});


app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);
