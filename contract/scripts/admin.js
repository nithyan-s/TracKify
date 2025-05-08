
// scripts/admin.js
require("dotenv").config();
const { ethers } = require("ethers");
const abi       = require("./abi.json");
const { generateHash } = require("./utils");

async function createAndStoreHashes(productId, buyerAddress, warehouseAddress) {
  // 1) make hashes
  const buyerHash     = generateHash(`${productId}-${buyerAddress}`);
  const warehouseHash = generateHash(`${productId}-${warehouseAddress}`);

  // 2) connect to Sepolia + signer
  const provider = new ethers.providers.InfuraProvider(
    "sepolia",
    process.env.INFURA_PROJECT_ID
  );
  const wallet = new ethers.Wallet(
    process.env.ADMIN_PRIVATE_KEY,
    provider
  );
  const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    abi,
    wallet
  );

  // 3) write to contract
  const tx = await contract.storeProductHashes(
    productId,
    buyerHash,
    warehouseHash
  );
  await tx.wait();

  return { buyerHash, warehouseHash, txHash: tx.hash };
}

module.exports = { createAndStoreHashes };





