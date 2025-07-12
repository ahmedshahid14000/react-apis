const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let items = [{ id: 1, name: "Item 1" }];

// READ: Get all items
app.get("/items", (req, res) => {
  res.json(items);
});

// CREATE: Add new item
app.post("/items", (req, res) => {
  const newItem = { id: Date.now(), name: req.body.name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// DELETE: Remove item by ID
app.delete("/items/:id", (req, res) => {
  items = items.filter((item) => item.id != req.params.id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is running on port 3000');
});