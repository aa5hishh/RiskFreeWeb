# RiskFreeWeb – Phishing URL Detection and Cyber Safety Dashboard

RiskFreeWeb is a full-stack web application designed to identify suspicious characteristics in website URLs and help users understand potential phishing risks. It provides a security dashboard with risk classifications, scan statistics, visual charts, scan history, and cyber safety tips.

## Features

- **URL Scanner:** Analyze a website URL for suspicious characteristics.
- **Risk Classification:** Categorize scanned URLs as Low, Medium, or High Risk.
- **Risk Score:** Assign a score based on detected URL patterns.
- **Statistics Dashboard:** Display total scans and the number of URLs in each risk category.
- **Risk Distribution Chart:** Visualize scan results using a doughnut chart.
- **Scan History:** Store and display previous URL scans.
- **Cyber Safety Tips:** Present basic guidance for safer browsing.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Dashboard structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Frontend interactions |
| Node.js | Server-side runtime |
| Express.js | Backend and REST API |
| SQLite | Store scan records |
| Chart.js | Visualize risk statistics |
| Git and GitHub | Version control and project hosting |

## Project Structure

```text
RiskFreeWeb/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── routes/
│   └── scans.js
├── utils/
│   └── detector.js
├── database.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## How It Works

1. The user enters a website URL in the dashboard.
2. The frontend sends the URL to the backend API.
3. The URL detector checks for suspicious characteristics, such as IP-address hosts, misleading keywords, unusually long URLs, excessive subdomains, URL shorteners, and punycode.
4. The application calculates a risk score and assigns a risk category.
5. The scan result is saved in the SQLite database.
6. The dashboard updates the statistics, chart, and scan history.

## Risk Classification

- **Low Risk:** Score from 0 to 29
- **Medium Risk:** Score from 30 to 59
- **High Risk:** Score from 60 to 100

These categories are based on predefined rules. They indicate suspicious URL characteristics and do not guarantee whether a website is safe or malicious.

## Installation and Setup

### Prerequisites

Install Node.js and npm on your computer.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/aa5hishh/RiskFreeWeb.git
   ```

2. Open the project directory:

   ```bash
   cd RiskFreeWeb
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   node server.js
   ```

5. Open the application in your browser:

   `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/scan` | Scan a URL |
| GET | `/api/scans` | Retrieve scan history |
| DELETE | `/api/scans/:id` | Delete a scan record |
| GET | `/api/stats` | Retrieve scan statistics |

## Limitations

- The detector uses predefined rules rather than a trained machine-learning model.
- A legitimate URL may sometimes be flagged as suspicious, and a phishing URL may not be detected.
- Risk scores should be treated as indicators, not definitive security verdicts.
- The application is intended for educational purposes and should not replace professional security tools.

## Future Enhancements

- Integrate trusted threat-intelligence services.
- Add more advanced phishing detection techniques.
- Improve mobile responsiveness and accessibility.
- Provide additional security reports and URL analysis details.

## Author

**Aashish Nath**

GitHub: [aa5hishh](https://github.com/aa5hishh)

## Disclaimer

RiskFreeWeb is an educational project. Always verify website addresses carefully and avoid entering sensitive information on suspicious websites.
