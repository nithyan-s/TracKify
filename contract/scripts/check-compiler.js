// scripts/check-compiler.js
const hre = require("hardhat");

async function main() {
  const config = hre.config;
  console.log("Hardhat Version:", hre.version);
  console.log("Solidity Version:", config.solidity.compilers[0].version);
}

main().catch(console.error);