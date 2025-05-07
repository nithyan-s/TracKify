// scripts/utils.js
const { ethers } = require("ethers");

/**
 * @param {string} data  Any string (e.g. `${productId}-${walletAddress}`)
 * @returns {string}      0x-prefixed keccak256 hash
 */
function generateHash(data) {
  return ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(data)
  );
}

module.exports = { generateHash };
