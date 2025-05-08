# 📈 Real-Time Crypto Price Tracker – Project Blueprint

## 🎯 Objective

Design and develop a **responsive web application** using **React** and **Redux Toolkit** to simulate **real-time cryptocurrency tracking**. This will be similar to CoinMarketCap, displaying market data in a dynamic table that updates every 1–2 seconds, simulating WebSocket updates.

---

## 🧱 Project Structure & Tech Stack

### 🧑‍💻 Tech Stack

| Purpose               | Technology                                           |
| --------------------- | ---------------------------------------------------- |
| Frontend Framework    | React (with Vite or CRA)                             |
| State Management      | Redux Toolkit (RTK)                                  |
| Styling               | Tailwind CSS / CSS Modules                           |
| Charting              | Recharts or Static SVG                               |
| Optional Enhancements | TypeScript, Jest, WebSockets (Binance), localStorage |

### 🔧 Folder Structure

```
/crypto-price-tracker
│
├── public/
├── src/
│   ├── assets/               # SVG logos and static 7D chart images
│   ├── components/           # Reusable components (TableRow, CryptoTable, Header)
│   ├── features/
│   │   └── crypto/           # Redux slice and selectors for crypto state
│   ├── services/             # Mock WebSocket/price simulator
│   ├── utils/                # Helper functions (price formatting, random generator)
│   ├── App.jsx
│   └── main.jsx
│
├── README.md
├── package.json
└── vite.config.js or CRA config
```

---

## 🧠 Functional Modules

### 1. 💻 UI Table (Crypto Dashboard)

**Component:** `CryptoTable.jsx`, `TableRow.jsx`

| Column             | Description                     |
| ------------------ | ------------------------------- |
| #                  | Index                           |
| Logo               | Coin logo                       |
| Name + Symbol      | BTC – Bitcoin                   |
| Price              | Live price                      |
| 1h %, 24h %, 7d %  | Randomized changes, color-coded |
| Market Cap         | Market capitalization           |
| 24h Volume         | Trading volume                  |
| Circulating Supply | Active coins in the market      |
| Max Supply         | Maximum possible supply         |
| 7D Chart           | SVG / static image              |

✅ **Features**:

* Responsive (use Flex/Grid)
* Green for positive %, red for negative %
* Tooltips on hover (optional)

---

### 2. 🔄 Simulated Real-Time Updates

**Service:** `mockWebSocket.js`
Use `setInterval` to mimic a real-time feed.

* Every **1–2 seconds**, dispatch Redux actions to:

  * Randomly update price, % changes, and volume.
  * Recalculate market cap and other derived values.

➡️ You can encapsulate logic in a `CryptoSimulator` class that hooks into the Redux dispatch loop.

---

### 3. ⚛️ Redux State Management

**Slice:** `cryptoSlice.js` under `features/crypto`

#### Initial State:

```js
{
  cryptoAssets: [/* 5 static coins with initial data */],
}
```

#### Actions:

* `updateCryptoData`: Mutate random coins’ values.
* `setCryptoData`: Load initial values.

#### Selectors:

* Use `createSelector` from Reselect for optimized re-renders.

---

### 4. 🌐 Optional Real WebSocket (Bonus)

**Integrate Binance WebSocket API**
Binance WebSocket URL: `wss://stream.binance.com:9443/ws/btcusdt@ticker`
Replace mock service with real data feed (modular implementation).

---

### 5. 📦 Enhancements (Bonus)

| Feature              | Benefit                           |
| -------------------- | --------------------------------- |
| Filters/sorting      | Top gainers, alphabetical, volume |
| localStorage support | Persist view state or filters     |
| TypeScript support   | Strong typing and maintainability |
| Unit tests (Jest)    | Reliability of logic + reducers   |
| Dark/light mode      | UI customization                  |

---

## ✅ Final Deliverables

### 1. 💾 GitHub Repo

* Structured codebase
* README.md with:

  * Project overview
  * Setup Instructions:

    ```bash
    git clone <repo>
    npm install
    npm run dev
    ```
  * Tech stack
  * GIF or video link (e.g., Loom or embedded in README)

---

## 🔴 Deployment 
    make this application into a proper deployment format 
    Deploy in vercel
    So add necessary files needed to that
    vercel config files (make the app deployable)
    



