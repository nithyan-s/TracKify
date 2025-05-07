// const { ethers } = require("ethers");
// require("dotenv").config();
// const fs = require("fs");
// const path = require("path");

// async function main() {
//   const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`);
  
//   // You can connect as any warehouse address (read-only), or use a wallet if needed
//   const warehouseWallet = ethers.Wallet.createRandom().connect(provider); // or load a real key if needed

//   const contractAddress = fs.readFileSync("deployedAddress.txt", "utf8").trim();
//   const artifactPath = path.join(__dirname, "..", "artifacts", "contracts", "AntiFake.sol", "AntiFake.json");
//   const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

//   const contract = new ethers.Contract(contractAddress, artifact.abi, warehouseWallet);

//   console.log("🏭 Verifying warehouse QR hash for product `prod123`...");
//   const result = await contract.verifyWarehouse(
//     "prod123",
//     ethers.utils.formatBytes32String("hashB_warehouse")
//   );

//   console.log(result ? "✅ QR Hash verified!" : "❌ Verification failed.");
// }

// main().catch((err) => {
//   console.error("❌ Warehouse Error:", err);
//   process.exit(1);
// });



// const { ethers } = require("ethers");
// require("dotenv").config();

// const contractABI = require("./ABI.json");
// const contractAddress = "0xfc015FC7Cf1117E07fe26E8f47d7DeBc28689e19";

// const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
// const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// async function verifyAndTransfer(productId, scannedHash) {
//     try {
//         console.log(`Verifying warehouse hash for product ${productId}...`);
        
//         // This should be a read-only call to check if the hash matches what's stored
//         // No gas estimation needed for read calls
//         const isValid = await contract.verifyWarehouse(productId, scannedHash);
        
//         console.log(`Warehouse verification for ${productId}: ${isValid ? "✅ Passed" : "❌ Failed"}`);
//         return isValid;
//     } catch (error) {
//         console.error(`Error in verifyAndTransfer:`, error.message);
//         throw error;
//     }
// }

// module.exports = { verifyAndTransfer };

// scripts/warehouse.js
require("dotenv").config();
const { ethers } = require("ethers");
const abi       = require("./abi.json");

async function verifyWarehouseHash(productId, warehouseHash) {
  // connect signer (warehouse)
  const provider = new ethers.providers.InfuraProvider(
    "sepolia",
    process.env.INFURA_PROJECT_ID
  );
  const wallet = new ethers.Wallet(
    process.env.WAREHOUSE_PRIVATE_KEY,
    provider
  );
  const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    abi,
    wallet
  );

  // call your solidity verify function (adjust name if needed!)
  const tx = await contract.verifyWarehouse(
    productId,
    warehouseHash
  );
  const receipt = await tx.wait();

  // assume your contract emits an event WarehouseVerified(uint indexed productId, bool status)
  const ev = receipt.events.find(e => e.event === "WarehouseVerified");
  if (ev) {
    return ev.args.status;
  }

  // fallback: treat a successful tx as true
  return receipt.status === 1;
}

module.exports = { verifyWarehouseHash };
