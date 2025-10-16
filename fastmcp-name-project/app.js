// app.js

// --- Global variables ---
let provider = null;
let signer = null;
let userAccount = null;

// --- Contract details ---
const lpContractAddress = '0x983b4393a55455928f747372365b364235332b84'; // Testnet address
const lpContractAbi = [
    "function deposit(uint256 amount)",
    "function withdraw(uint256 amount)"
];

// --- Main function ---
document.addEventListener('DOMContentLoaded', () => {
    fetchSportsData();
    
    document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
    document.getElementById('depositBtn').addEventListener('click', depositLiquidity);
    document.getElementById('withdrawBtn').addEventListener('click', withdrawLiquidity); // <-- NEW: Add listener for withdraw
});

// --- Helper function to show status messages ---
function updateStatus(message, type) {
    const statusBox = document.getElementById('statusMessage');
    statusBox.textContent = message;
    statusBox.className = 'status-message';
    if (type) {
        statusBox.classList.add(type);
    }
}

// --- Wallet Functions ---
async function connectWallet() {
    // ... (This function remains the same) ...
    if (typeof window.ethereum === 'undefined') {
        return updateStatus('Please install MetaMask to use this feature.', 'error');
    }
    try {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        userAccount = await signer.getAddress();
        
        document.getElementById('connectWalletBtn').style.display = 'none';
        document.getElementById('walletInfo').style.display = 'block';
        document.getElementById('userAddress').textContent = userAccount;
        
        fetchLiquidityBalance();
        updateStatus('', null);
    } catch (error) {
        console.error("Error connecting wallet:", error);
        updateStatus("Failed to connect wallet. See console for details.", 'error');
    }
}

async function fetchLiquidityBalance() {
    // ... (This function remains the same) ...
    if (!userAccount) return;
    try {
        const response = await fetch(`http://localhost:3000/liquidity/${userAccount}`);
        const data = await response.json();
        document.getElementById('liquidityBalance').textContent = parseFloat(data.balance).toFixed(2);
        return data.balance; // Return the balance for validation
    } catch (error) {
        console.error("Failed to fetch balance from API:", error);
        return '0';
    }
}

// --- Blockchain "Write" Transactions ---

async function depositLiquidity() {
    // ... (This function remains the same) ...
    const depositBtn = document.getElementById('depositBtn');
    if (!signer) return updateStatus("Please connect your wallet first.", 'error');
    const amount = document.getElementById('lpAmount').value;
    if (!amount || amount <= 0) return updateStatus("Please enter a valid amount.", 'error');
    try {
        depositBtn.disabled = true;
        updateStatus("Please approve the transaction in MetaMask...", 'info');
        const lpContract = new ethers.Contract(lpContractAddress, lpContractAbi, signer);
        const amountInWei = ethers.parseUnits(amount, 6);
        const tx = await lpContract.deposit(amountInWei);
        updateStatus(`Transaction sent! Waiting for confirmation...`, 'info');
        await tx.wait();
        updateStatus("Deposit successful!", 'success');
        fetchLiquidityBalance();
        document.getElementById('lpAmount').value = '';
    } catch (error) {
        console.error("Deposit failed:", error);
        updateStatus("Deposit failed. You may have rejected the transaction or have insufficient funds.", 'error');
    } finally {
        depositBtn.disabled = false;
    }
}

// --- NEW: Function to Withdraw Liquidity ---
async function withdrawLiquidity() {
    const withdrawBtn = document.getElementById('withdrawBtn');
    if (!signer) return updateStatus("Please connect your wallet first.", 'error');

    const amount = document.getElementById('lpAmount').value;
    if (!amount || amount <= 0) return updateStatus("Please enter a valid amount.", 'error');

    try {
        // Crucial Validation Step: Check if the user has enough to withdraw
        const currentBalance = await fetchLiquidityBalance();
        if (parseFloat(amount) > parseFloat(currentBalance)) {
            return updateStatus("Withdrawal amount cannot be greater than your balance.", 'error');
        }

        withdrawBtn.disabled = true;
        updateStatus("Please approve the withdrawal in MetaMask...", 'info');

        const lpContract = new ethers.Contract(lpContractAddress, lpContractAbi, signer);
        const amountInWei = ethers.parseUnits(amount, 6); // Convert to 6 decimals

        const tx = await lpContract.withdraw(amountInWei);
        
        updateStatus(`Withdrawal sent! Waiting for confirmation...`, 'info');
        
        await tx.wait(); // Wait for 1 confirmation
        
        updateStatus("Withdrawal successful!", 'success');
        fetchLiquidityBalance(); // Refresh the balance
        document.getElementById('lpAmount').value = '';

    } catch (error) {
        console.error("Withdrawal failed:", error);
        updateStatus("Withdrawal failed. You may have rejected the transaction.", 'error');
    } finally {
        withdrawBtn.disabled = false;
    }
}


// --- Original function to fetch sports data ---
async function fetchSportsData() {
    // ... (This function remains exactly the same) ...
    const sportsList = document.getElementById('sports-list');
    const apiUrl = 'http://localhost:3000/sports';
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error!`);
        const data = await response.json();
        sportsList.innerHTML = '';
        data.sports.forEach(sport => {
            const listItem = document.createElement('li');
            listItem.textContent = `${sport.name} (ID: ${sport.id})`;
            sportsList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Failed to fetch sports data:', error);
        sportsList.innerHTML = '<li>Failed to load sports data.</li>';
    }
}