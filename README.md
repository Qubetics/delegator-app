# 📘 DELEGATOR Application
This project is a **Delegator Application** built for interacting with Cosmos SDK-based blockchains.  
It empowers users to **delegate their tokens** to validators and actively participate in the staking economy — earning rewards while contributing to network security.

The application provides:

- 🔐 Secure wallet integration (Keplr)
- 🔎 Validator list with performance metrics
- 🪙 Delegation, re-delegation, and un-delegation flows
- 📈 Real-time updates on staking rewards
- 🧾 Delegation history and transaction tracking

Built for performance and ease of use, this app helps delegators manage their staking positions in a transparent and user-friendly way.


##

## 📂 Folder Structure

```
your-project/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```
---

## 🛠️ Getting Started

Follow these steps to clone and run the application locally.

### 📥 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
```

### 📂 2. Move into the Project Directory

```bash
cd your-repo-name
```
```Checkout to prod branch
git checkout prod
```

```Create a new branch from prod
git checkout -b Branch_name
```
### 📦 3. Install Dependencies

```bash
npm install 
# or
yarn install
```

### ▶️ 4. Start the Development Server

```bash
npm start
# or
yarn start
```

Your app will now be running at:

```
http://localhost:3000
```

---

## 📋 Requirements

- Node.js (version 16 or above recommended)
- npm or yarn

---

## 🧪 Available Scripts

In the project directory, you can run:

| Command           | Description                            |
|-------------------|----------------------------------------|
| `npm start`       | Runs the app in development mode       |
| `npm run build`   | Builds the app for production          |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

The MIT License applies to this project's original code. Third-party dependencies and bundled third-party code or assets retain their respective licenses and notices.

---
## ENV Example
REACT_APP_NAME= APP_NAME
REACT_APP_CURRENCY=CURRENCY_NAME
REACT_APP_SOCKET_HOST="NODE_SOCKET_URL"
REACT_APP_BASE_URL_EXPLORER_API_LINKS = "YOUR_SITE_API_URL"
REACT_APP_EXPLORER_NAVIGATION_LINK="YOUR_SITE_URL"
REACT_APP_DECIMAL_VALUE=TOKEN_DECIMAL
REACT_APP_BASE_URL_NOMINATOR="YOUR_NATIVE_API_URL"
REACT_APP_FEE_DEDUCTION=MIN_FEE_DEDUCTION
