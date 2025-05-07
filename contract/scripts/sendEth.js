// const { ethers } = require("ethers");
// require("dotenv").config();

// async function main() {
//   const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`);
  
//   const adminWallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, provider);
//   const warehouseAddress = process.env.WAREHOUSE_ADDRESS;

//   console.log(`💼 Admin Wallet: ${adminWallet.address}`);
//   console.log(`🏬 Sending to Warehouse: ${warehouseAddress}`);

//   const tx = await adminWallet.sendTransaction({
//     to: warehouseAddress,
//     value: ethers.utils.parseEther("0.01"), // 0.01 ETH
//     gasLimit: 21000,
//   });

//   console.log("⏳ Transaction sent. Waiting for confirmation...");
//   await tx.wait();

//   console.log("✅ Transaction confirmed!");
//   console.log(`🔗 View on Sepolia Etherscan: https://sepolia.etherscan.io/tx/${tx.hash}`);
// }

// main().catch((err) => {
//   console.error("❌ Error:", err);
//   process.exit(1);
// });


// const { ethers } = require("ethers");
// require("dotenv").config();

// // const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
// const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/a093a60fddd24f84969606efd592fe07");
// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// async function sendEth(toAddress, amountInEth) {
//     const tx = await wallet.sendTransaction({
//         to: toAddress,
//         value: ethers.parseEther(amountInEth),
//     });

//     await tx.wait();
//     console.log(`✅ Transaction successful: ${tx.hash}`);
//     return tx.hash;
// }

// module.exports = { sendEth };

const { ethers } = require("ethers");

const INFURA_PROJECT_ID = "a093a60fddd24f84969606efd592fe07";
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`);

const senderPrivateKey = "a3990ecc4be17e504cbaf3d7157f58ba197e9dff0cf168e186afc4e45b0575a1";
const senderWallet = new ethers.Wallet(senderPrivateKey, provider);

async function sendEth(to, amountInEth) {
  const tx = {
    to: to,
    value: ethers.utils.parseEther(amountInEth),
    gasLimit: 500000,
  };

  const transaction = await senderWallet.sendTransaction(tx);
  await transaction.wait();
  console.log(`Sent ${amountInEth} ETH to ${to}. TxHash: ${transaction.hash}`);
}

module.exports = { sendEth };
