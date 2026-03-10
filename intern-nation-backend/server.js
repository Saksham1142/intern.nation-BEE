const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

app.post("/apply", (req, res) => {

    const data = req.body;

    res.send("Application received");

});

app.get("/", (req, res) => {
  res.send("Welcome to Intern.nation Backend");
});

app.get("/internships", (req, res) => {
    res.send("List of internships");
});

app.get("/companies", (req, res) => {
    res.send("List of companies");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
