
const form = document.getElementById("scanForm");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const url = document.getElementById("url").value.trim();

  try {
    const response = await fetch("/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error);

    result.className = "";

if (data.category === "Low Risk") {
  result.classList.add("low");
} else if (data.category === "Medium Risk") {
  result.classList.add("medium");
} else {
  result.classList.add("high");
}

    result.textContent =
      `Risk: ${data.category} (${data.score}/100) — ${data.reasons.join(", ")}`;

    await loadStats();
    await loadHistory();
    await loadChart();
  } catch (error) {
  result.className = "error";
  result.textContent =
    error.message || "Could not connect to server.";
}
});

async function loadStats() {
  const r = await fetch("/api/stats");
  const d = await r.json();

  document.getElementById("total").textContent = d.total;
  document.getElementById("high").textContent = d.high;
  document.getElementById("medium").textContent = d.medium;
  document.getElementById("low").textContent = d.low;
}

async function loadHistory() {
  const r = await fetch("/api/scans");
  const data = await r.json();
  const list = document.getElementById("history");

  list.replaceChildren();

  data.forEach(scan => {
    const item = document.createElement("li");
    item.textContent =
      `${scan.url} — ${scan.category} (${scan.score}/100)`;
    list.appendChild(item);
  });
}
loadStats();
loadHistory();

let riskChart;

async function loadChart() {
  const response = await fetch("/api/stats");
  const data = await response.json();

  const canvas = document.getElementById("riskChart");
  if (!canvas) return;

  if (riskChart) riskChart.destroy();

  riskChart = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: ["Low Risk", "Medium Risk", "High Risk"],
      datasets: [{
        data: [data.low, data.medium, data.high],
        backgroundColor: ["#22c55e", "#f59e0b", "#ef4444"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

loadChart();
