// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

import "hardhat/console.sol";

contract AntiFake {
    address public admin;
    
    struct Product {
        bytes32 buyerHash;       // HashA (sent to buyer)
        bytes32 warehouseHash;  // HashB (in QR code)
        bool isVerified;       // Passed all checks?
    }
    
    mapping(string => Product) public products;
    
    event HashesStored(string productId);
    event WarehouseVerified(string productId, address verifier);
    event BuyerVerified(string productId, address buyer);

    constructor() {
        admin = msg.sender;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }

    // Store hashes after purchase (called by admin backend)
    function storeHashes(
        string memory productId,
        bytes32 buyerHash,
        bytes32 warehouseHash
    ) external onlyAdmin {
        require(products[productId].buyerHash == bytes32(0), "Hashes already stored");
        
        products[productId] = Product({
            buyerHash: buyerHash,
            warehouseHash: warehouseHash,
            isVerified: false
        });
        
        emit HashesStored(productId);
    }

    // Warehouse verification (compare scanned QR hash with on-chain hash)
    function verifyWarehouse(
        string memory productId,
        bytes32 scannedHash
    ) external returns (bool) {
        require(products[productId].warehouseHash != bytes32(0), "Product not registered");
        
        bool isValid = products[productId].warehouseHash == scannedHash;
        
        if (isValid) {
            emit WarehouseVerified(productId, msg.sender);
        }
        return isValid;
    }

    // Final buyer verification
    function verifyBuyer(
        string memory productId,
        bytes32 buyerHash
    ) external returns (bool) {
        require(products[productId].buyerHash != bytes32(0), "Product not registered");
        
        bool isValid = products[productId].buyerHash == buyerHash;
        
        if (isValid) {
            products[productId].isVerified = true;
            emit BuyerVerified(productId, msg.sender);
        }
        return isValid;
    }

    // Getters
    function getHashes(string memory productId) external view returns (bytes32, bytes32) {
        return (products[productId].buyerHash, products[productId].warehouseHash);
    }
    
    function isVerified(string memory productId) external view returns (bool) {
        return products[productId].isVerified;
    }
}