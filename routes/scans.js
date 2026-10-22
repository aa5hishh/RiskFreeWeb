
const express = require("express");
const router = express.Router();

const db = require("../database");
const { analyzeURL } = require("../utils/detector");

router.post("/scan", (req, res) => {
  try {
    const { url } = req.body;

    if (typeof url !== "string" || !url.trim()) {
      return res.status(400).json({ error: "Enter a URL." });
    }

    const result = analyzeURL(url.trim());

    const insert = db.prepare(`
      INSERT INTO scans (url, score, category, reasons)
      VALUES (?, ?, ?, ?)
    `);

    const saved = insert.run(
      result.url,
      result.score,
      result.category,
      JSON.stringify(result.reasons)
    );

    res.json({ ...result, id: saved.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/scans", (req, res) => {
  const scans = db.prepare(`
    SELECT * FROM scans ORDER BY id DESC LIMIT 100
  `).all();

  res.json(scans.map(scan => ({
    ...scan,
    reasons: JSON.parse(scan.reasons)
  })));
});

router.delete("/scans/:id", (req, res) => {
  const result = db.prepare("DELETE FROM scans WHERE id = ?")
    .run(req.params.id);

  if (!result.changes) {
    return res.status(404).json({ error: "Scan not found." });
  }

  res.json({ message: "Scan deleted." });
});

router.get("/stats", (req, res) => {
  const rows = db.prepare(`
    SELECT category, COUNT(*) AS count
    FROM scans GROUP BY category
  `).all();

  const counts = { "High Risk": 0, "Medium Risk": 0, "Low Risk": 0 };

  rows.forEach(row => {
    counts[row.category] = row.count;
  });

  res.json({
    total: Object.values(counts).reduce((a, b) => a + b, 0),
    high: counts["High Risk"],
    medium: counts["Medium Risk"],
    low: counts["Low Risk"]
  });
});

module.exports = router;
