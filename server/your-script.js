// Import ethers.js if using ES6 modules, otherwise include via <script> tag
// import { ethers } from 'ethers';

// Check if MetaMask is installed
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');

    // Get the button element
    const connectWalletButton = document.getElementById('connect-wallet-button');

    // Function to connect wallet and get the address
    async function connectWallet() {
        try {
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // We can now access the user's account
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const userAddress = await signer.getAddress();

            // Update button text with the user's wallet address
            connectWalletButton.textContent = userAddress;

            // Optional: Add an event listener to update the address if it changes
            window.ethereum.on('accountsChanged', function (accounts) {
                connectWalletButton.textContent = accounts[0] || 'Connect Wallet';
            });

        } catch (error) {
            console.error('Error connecting to wallet:', error);
        }
    }

    // Add click event listener to the button
    connectWalletButton.addEventListener('click', connectWallet);
} else {
    console.error('MetaMask is not installed. Please install MetaMask to use this feature.');
    document.getElementById('connect-wallet-button').textContent = 'MetaMask Not Installed';
}
