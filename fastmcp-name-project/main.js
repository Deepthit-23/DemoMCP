// main.js

import express from 'express';
import axios from 'axios';
import 'dotenv/config';
import cors from 'cors';
import { ethers } from "ethers"; // Import ethers for the backend
import { provider } from "./connect.js"; // Import your blockchain connection

// --- Existing Subgraph Setup ---
const subgraphId = 'J4Ww1R6DQQ57dBmUzdi7oogFTe2TFL6ci41oTWwqrb4L';
const apiKey = process.env.GRAPH_API_KEY;
const AZURO_SUBGRAPH_URL = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/${subgraphId}`;

// --- NEW: Liquidity Pool Contract Details ---
const lpContractAddress = '0x983b4393a55455928f747372365b364235332b84';
const lpContractAbi = [ "function balanceOf(address account) view returns (uint256)" ];
const lpContract = new ethers.Contract(lpContractAddress, lpContractAbi, provider);

// --- Create and Configure the Express App ---
const app = express();
const port = 3000;
app.use(cors());

// --- Existing API Endpoint for Sports ---
app.get('/sports', async (req, res) => {
    // ... this code remains the same ...
    console.log("Received a request for /sports");
    const graphQLQuery = { query: ` query { sports { id slug name } } ` };
    try {
        const response = await axios.post(AZURO_SUBGRAPH_URL, graphQLQuery);
        if (response.data.errors) { throw new Error(`GraphQL Error: ${response.data.errors[0].message}`); }
        const sports = response.data.data.sports;
        res.json({ sports: sports });
    } catch (error) {
        console.error("API Error:", error.message);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// --- NEW: API Endpoint for Liquidity Balance ---
app.get('/liquidity/:userAddress', async (req, res) => {
  try {
    const userAddress = req.params.userAddress;
    console.log(`Fetching liquidity balance for ${userAddress}...`);
    const balance = await lpContract.balanceOf(userAddress);
    // Azuro LP tokens use 6 decimals, like USDC
    const formattedBalance = ethers.formatUnits(balance, 6);
    res.json({ balance: formattedBalance });
  } catch (error) {
    console.error("Failed to fetch liquidity:", error);
    res.status(500).json({ error: 'Failed to fetch liquidity balance' });
  }
});

// --- Start the server ---
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});