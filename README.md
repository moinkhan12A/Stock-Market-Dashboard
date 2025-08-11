# 📊 Stock Dashboard Backend (Mock Data)

**It is not just part of an assignment but also developed as a strong addition to my professional portfolio.**  
A simple yet powerful backend application for serving realistic stock market data, built using **Node.js** and **Express.js**. Designed for frontend integration, scalability, and demonstration of API development skills.

---

##  Overview
This backend serves **1 year (365 days)** of mock daily stock prices for **10 companies**, complete with key metrics like 52-week high/low, average volume, and SMA(20). The focus is on **code quality**, **maintainability**, and **frontend-readiness**.

---

## 🛠 Key Features
- **Mock Stock Dataset Generator** – Consistent, API-independent data generation.
- **Core APIs**:
  - `GET /api/companies` → List all companies.
  - `GET /api/stock/:symbol` → Full historical data for a company.
  - `GET /api/stock/:symbol/summary` → Quick stats: 52-week high, low, avg volume, SMA(20).
- **Bonus Features**:
  - SMA(20) short-term trend analysis.
  - Summary endpoint for faster frontend rendering.
  - Modular code structure for easy scaling.

---

## ⚙️ Technical Approach
- **Node.js + Express.js** for high performance.
- Data served from a **JSON file** for speed and simplicity.
- Modular folder structure: `/routes`, `/utils`, `/data`.
- Thoroughly tested with **Postman** for accuracy.

---

## 🧰 Technologies Used
- Node.js  
- Express.js  
- JavaScript  
- CORS  
- Postman  

---

## 📂 Project Setup

```bash
# 1. Install dependencies
npm install

# 2. Generate mock data (creates data/stocks.json)
npm run generate

# 3. Start server
npm start