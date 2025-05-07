// require("@nomicfoundation/hardhat-toolbox");
// require("dotenv").config();

// module.exports = {
//   solidity: "0.8.19",
//   networks: {
//     localhost: {
//       url: "http://127.0.0.1:8545",
//       chainId: 31337,
//     },
//     sepolia: {
//       url: process.env.SEPOLIA_RPC_URL,
//       accounts: [`0x${process.env.PRIVATE_KEY}`],
//       chainId: 11155111,
//     },
//   },
//   etherscan: {
//     apiKey: process.env.ETHERSCAN_API_KEY,
//   },
//   paths: {
//     artifacts: "./artifacts",
//     sources: "./contracts",
//     tests: "./test",
//   },
// };

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY],
    }
  }
};