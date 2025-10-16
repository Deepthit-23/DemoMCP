# Azuro Protocol Web Dashboard

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A full-stack decentralized application (dApp) that serves as a user-friendly bridge to the Azuro prediction market protocol on the Polygon blockchain. This project makes complex Web3 interactions, like liquidity provision, accessible through a simple and intuitive web interface.

This project was developed as a practical implementation of the **Model-Context-Protocol-Agent (MCPA)** architectural pattern for decentralized systems.

![Image of the Azuro dashboard UI](dashboard-screenshot.png)

---

## Core Features

-   **Real-Time Data Display**: Connects to the official Azuro Subgraph API to display an up-to-date list of available sports markets.
-   **Web3 Wallet Integration**: Allows users to connect their MetaMask wallet to establish a secure, personal link to the blockchain.
-   **On-Chain Balance Viewing**: Reads directly from the Polygon blockchain to show a user's current investment in Azuro's liquidity pool.
-   **Blockchain Transactions**: Enables users to perform "write" operations (deposits and withdrawals) to the liquidity pool smart contract, complete with on-page status updates.

---

## Tech Stack

-   **Frontend**: HTML5, CSS3, JavaScript (ES6+)
-   **Backend**: Node.js, Express.js
-   **Blockchain Interaction**:
    -   `ethers.js` for wallet connection and smart contract transactions.
    -   `axios` for making GraphQL requests to the Subgraph API.
    -   `dotenv` for secure management of API keys.
-   **Web3 Services**:
    -   The Graph Protocol (for reading indexed blockchain data).
    -   Alchemy/Infura (for RPC node connection).
    -   MetaMask