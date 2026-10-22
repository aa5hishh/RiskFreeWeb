
function analyzeURL(input) {
  let url;

  try {
    url = new URL(input);
  } catch {
    throw new Error("Please enter a valid URL.");
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Only HTTP and HTTPS URLs are supported.");
  }

  const host = url.hostname;
  const fullURL = input.toLowerCase();
  const reasons = [];
  let score = 0;

  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) {
    score += 25;
    reasons.push("Uses an IP address as the hostname");
  }

  if (/(login|verify|account|password|signin|secure)/i.test(url.pathname + url.search)) {
    score += 15;
    reasons.push("Contains login or verification-related wording");
  }

  if (input.length > 100) {
    score += 10;
    reasons.push("Unusually long URL");
  }

  if (host.split(".").length > 4) {
    score += 20;
    reasons.push("Contains an unusually deep subdomain structure");
  }

  if (/(bit\.ly|tinyurl\.com|t\.co)/i.test(host)) {
    score += 10;
    reasons.push("Uses a known URL-shortening domain");
  }

  if (host.includes("xn--")) {
    score += 20;
    reasons.push("Contains an internationalized hostname requiring closer inspection");
  }

  score = Math.min(score, 100);

  const category =
    score >= 60 ? "High Risk" :
    score >= 30 ? "Medium Risk" : "Low Risk";

  if (reasons.length === 0) {
    reasons.push("No configured suspicious indicators were detected");
  }

  return { url: url.href, score, category, reasons };
}

module.exports = { analyzeURL };
