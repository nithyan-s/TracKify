// const { ethers } = require("ethers");
// require("dotenv").config();
// const fs = require("fs");
// const path = require("path");

// async function main() {
//   const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`);
//   const adminWallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, provider);

//   const contractAddress = fs.readFileSync("deployedAddress.txt", "utf8").trim();
//   const artifactPath = path.join(__dirname, "..", "artifacts", "contracts", "AntiFake.sol", "AntiFake.json");
//   const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

//   const contract = new ethers.Contract(contractAddress, artifact.abi, adminWallet);

//   console.log("📦 Storing hashes for product `prod123`...");
//   const tx = await contract.storeHashes(
//     "prod123",
//     ethers.utils.formatBytes32String("hashA_buyer"),
//     ethers.utils.formatBytes32String("hashB_warehouse")
//   );
//   await tx.wait();

//   console.log("✅ Hashes stored!");
// }

// main().catch((err) => {
//   console.error("❌ Admin Error:", err);
//   process.exit(1);
// });

// const { ethers } = require("ethers");
// require("dotenv").config();

// const contractABI = require("./ABI.json");
// const contractAddress = "0xfc015FC7Cf1117E07fe26E8f47d7DeBc28689e19";

// const provider = new ethers.providers.JsonRpcProvider(
//   `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
// );
// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
// const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// async function storeHashes(productId, buyerHashStr, warehouseHashStr) {
//   // 🔐 Convert to keccak256 hashes (safe for any length)
//   const buyerHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(buyerHashStr));
//   const warehouseHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(warehouseHashStr));

//   const tx = await contract.storeHashes(productId, buyerHash, warehouseHash);
//   await tx.wait();

//   console.log(`✅ Hashes stored for product ${productId}`);
// }

// module.exports = { storeHashes };


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





