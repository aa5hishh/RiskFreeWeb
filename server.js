
const express = require("express");
const path = require("path");
const scans = require("./routes/scans");

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", scans);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`RiskFreeWeb running at http://localhost:${PORT}`);
});
