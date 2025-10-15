// main.js - FINAL WORKING VERSION

import express from 'express';
import axios from 'axios';
import 'dotenv/config'; // Loads variables from .env file
import cors from 'cors';

// --- Construct the Subgraph URL using your secret API key ---
const subgraphId = 'J4Ww1R6DQQ57dBmUzdi7oogFTe2TFL6ci41oTWwqrb4L';
const apiKey = process.env.GRAPH_API_KEY; // Reads key from .env file
const AZURO_SUBGRAPH_URL = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/${subgraphId}`;

// --- Create the Express App ---
const app = express();
const port = 3000;

app.use(cors());

// --- Define the API endpoint ---
app.get('/sports', async (req, res) => {
  console.log("Received a request for /sports");

  if (!apiKey) {
    console.error("API Key is missing! Check your .env file and restart the server.");
    return res.status(500).json({ error: 'API Key is not configured. Check your .env file.' });
  }

  const graphQLQuery = {
    query: `
      query {
        sports {
          id
          slug
          name
        }
      }
    `
  };

  try {
    const response = await axios.post(AZURO_SUBGRAPH_URL, graphQLQuery);
    
    if (response.data.errors) {
      throw new Error(`GraphQL Error: ${response.data.errors[0].message}`);
    }

    const sports = response.data.data.sports;
    console.log("🏅 Success! Fetched sports from the Subgraph API:", sports);
    res.json({
      sports: sports
    });

  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).json({ error: 'Failed to fetch data from the Subgraph API' });
  }
});

// --- Start the server ---
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
  console.log(`Visit http://localhost:${port}/sports to see the Azuro sports data`);
});