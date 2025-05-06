# 🛡 AntiFake Product Verification System

> *Blockchain-Powered Supply Chain Authenticity Tracker*  
> Verify products, prevent counterfeits, and ensure secure ETH transactions on the *Ethereum Sepolia testnet*.

![Tech](https://img.shields.io/badge/Tech-Blockchain-blue) ![Smart Contract](https://img.shields.io/badge/Smart--Contract-Solidity-363636) ![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 Features

- ✅ Blockchain-based product authenticity
- 🔐 Admin stores product hashes
- 🧾 Warehouse verifies authenticity
- 💸 Automatic ETH transfer on verification
- 🔄 Frontend-Backend-Smart Contract integration
- 🧠 MetaMask Wallet Integration

---

## 🧱 Tech Stack

| Layer     | Tech Used                            |
|-----------|--------------------------------------|
| Frontend  | React.js, Ethers.js, MetaMask        |
| Backend   | Node.js, Express.js                  |
| Blockchain| Solidity, Ethereum (Sepolia), Infura |
| Contract  | Hardhat for testing, Sepolia for live deployment |

---

## 📂 Folder Structure

```bash
project-root/
│
├── contract/               # Solidity smart contract
│   └── AntiFake.sol
│
├── backend/                # Node.js backend
│   ├── controllers/
│   │   └── transactionController.js
│   ├── routes/
│   │   └── transactionRoutes.js
│   ├── server.js
│   └── .env
│
├── frontend/               # React frontend
│   └── src/
│       └── blockchain/
│           └── warehouse.js
│
└── README.md
