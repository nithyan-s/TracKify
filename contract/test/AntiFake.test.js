const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AntiFake Contract", function () {
  let AntiFake, contract, admin, warehouse, buyer;

  before(async () => {
    [admin, warehouse, buyer] = await ethers.getSigners();
    AntiFake = await ethers.getContractFactory("AntiFake");
    contract = await AntiFake.deploy();
    await contract.deployed();
  });

  it("Should store hashes correctly", async () => {
    await contract.connect(admin).storeHashes(
      "PROD-123",
      "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
    );

    const [hashA, hashB] = await contract.getHashes("PROD-123");
    expect(hashA).to.equal("0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef");
    expect(hashB).to.equal("0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890");
  });

  it("Should verify warehouse correctly", async () => {
    await contract.connect(admin).whitelistWarehouse(warehouse.address, true);
    
    const result = await contract.connect(warehouse).verifyWarehouse(
      "PROD-123",
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
    );
    expect(result).to.equal(true);
  });

  it("Should reject unwhitelisted warehouses", async () => {
    await expect(
      contract.connect(buyer).verifyWarehouse(
        "PROD-123",
        "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
      )
    ).to.be.revertedWith("Not whitelisted");
  });

  it("Should verify buyer correctly", async () => {
    const result = await contract.connect(buyer).verifyBuyer(
      "PROD-123",
      "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
    );
    expect(result).to.equal(true);
    expect(await contract.isVerified("PROD-123")).to.equal(true);
  });
});