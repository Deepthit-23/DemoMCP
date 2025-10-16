Azuro Protocol Web Dashboard
A full-stack decentralized application (dApp) that serves as a user-friendly bridge to the Azuro prediction market protocol on the Polygon blockchain. This project makes complex Web3 interactions, like liquidity provision, accessible through a simple and intuitive web interface.

This project was developed as a practical implementation of the Model-Context-Protocol-Agent (MCPA) architectural pattern for decentralized systems.

Core Features
Real-Time Data Display: Connects to the official Azuro Subgraph API to display an up-to-date list of available sports markets.

Web3 Wallet Integration: Allows users to connect their MetaMask wallet to establish a secure, personal link to the blockchain.

On-Chain Balance Viewing: Reads directly from the Polygon blockchain to show a user's current investment in Azuro's liquidity pool.

Blockchain Transactions: Enables users to perform "write" operations (deposits and withdrawals) to the liquidity pool smart contract, complete with on-page status updates.

Tech Stack
Frontend: HTML5, CSS3, JavaScript (ES6+)

Backend: Node.js, Express.js

Blockchain Interaction:

ethers.js for wallet connection and smart contract transactions.

axios for making GraphQL requests to the Subgraph API.

dotenv for secure management of API keys.

Web3 Services:

The Graph Protocol (for reading indexed blockchain data).

Alchemy/Infura (for RPC node connection).

MetaMask (as the user wallet provider).

Getting Started
Follow these instructions to get a local copy up and running for development and testing purposes.

Prerequisites
Node.js (v18 or later recommended)

NPM (usually comes with Node.js)

MetaMask browser extension

Installation & Setup
Clone the repository:

Bash

git clone https://github.com/Deepthit-23/DemoMCP.git
cd DemoMCP/fastmcp-name-project
Install NPM packages:

Bash

npm install
Set up your environment variables:

Create a new file in the root directory named .env.

Obtain a free API key from The Graph.

Obtain a free RPC URL from Alchemy for the Polygon Amoy testnet.

Add the following content to your .env file:

Code snippet

# The Graph API Key
GRAPH_API_KEY=your_graph_api_key_here

# Polygon Amoy RPC URL
AMOY_RPC_URL=your_alchemy_rpc_url_here
Note: You will also need to update the AMOY_RPC_URL inside the connect.js file.

Run the application:

Start the backend server:

Bash

node main.js
Start the frontend:

If you use VS Code, right-click the index.html file and select "Open with Live Server".

How to Contribute
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

Potential Areas for Contribution
Implement the withdraw functionality.

Improve the UI/UX with more advanced CSS and animations.

Add a feature to display upcoming games and their odds.

Refactor the code to use a front-end framework like React or Vue.

License
Distributed under the MIT License. See LICENSE for more information.