import Head from "next/head";
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import contractAbi from '../abis/contractAbi';
import Web3 from 'web3'
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";

export default function TranscriptPaymentPage() {
    const { account, active, activate, chainId, connector, library, deactivate } = useWeb3React()
    const [amount, setAmount] = useState('');
    const contractAddress = "0x57b5cCb71Bb1BdF0460b8A5819C354AD8087673d";
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const [transactionHash, setTransactionHash] = useState('');
    const [walletConnected, setWalletConnected] = useState(false);
    const supportedChainIds = [
        1, // mainnet
        5, // goreli
        137, // matic
        80001, // matic testnet
        56, // binance smart chain
        97, // binance smart chain testnet
    ];

    const injected = new InjectedConnector({
        supportedChainIds
    })

    async function handleWalletConnect() {
        try {
            await activate(injected, undefined, true)
        } catch (error) {
            console.error("Error while trying to connect wallet:", error)
        }
    }

    function getLibrary(provider) {
        return new Web3(provider);
    }

    async function connectWallet() {
        if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            return new ethers.providers.Web3Provider(window.ethereum);
        } else {
            alert("Please install Metamask to use this application.");
            throw new Error("Please install Metamask to use this application.");
        }
    }

    async function handleConnectWallet() {
        try {
            await connectWallet();
            setWalletConnected(true);
        } catch (error) {
            console.error("Error connecting wallet:", error);
            throw new Error("Failed to connect the wallet. Please try again");
        }
    }

    async function handlePayment() {
        try {
            const provider = await connectWallet();
            const signer = provider.getSigner();

            const contract = new ethers.Contract(contractAddress, contractAbi, signer);
            const paymentTx = await contract.requestTranscript({ value: ethers.utils.parseEther(amount.toString()) });
            const receipt = await paymentTx.wait();
            setTransactionHash(receipt.transactionHash);
            setPaymentConfirmed(true);
        } catch (error) {
            console.error("Payment failed:", error);
            setTransactionHash('');
        }
    }

    async function checkPaymentStatus() {
        try {
            const provider = await connectWallet();
            const signer = provider.getSigner();

            const contract = new ethers.Contract(contractAddress, contractAbi, signer);
            const isPaid = await contract.paidStudents(signer.getAddress());
            setPaymentConfirmed(isPaid);
        } catch (error) {
            console.error("Failed to check payment status:", error);
        }
    }

    async function fetchTranscriptPrice() {
        try {
            const provider = await connectWallet();
            const signer = provider.getSigner();

            const contract = new ethers.Contract(contractAddress, contractAbi, signer);
            const price = await contract.transcriptPrice();
            setAmount(price);
        } catch (error) {
            console.error("Failed to fetch transcript price:", error);
        }
    }

    useEffect(() => {
        checkPaymentStatus();
        fetchTranscriptPrice();
    }, [walletConnected]);

    return (
        <Web3ReactProvider getLibrary={getLibrary} >
            <>
                <Head>
                    <title>Pay Fee - Transcript Processing System</title>
                    <link href="/images/icon.png" rel="shortcut icon" type="image/x-icon" />
                </Head>

                <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                    <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Transcript Payment</h2>
                        {walletConnected ? (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                        Amount
                                    </label>
                                    <input
                                        id="amount"
                                        type="number"
                                        step="0.01"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <button
                                    onClick={handlePayment}
                                    className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600"
                                >
                                    Pay Now
                                </button>
                                {transactionHash && (
                                    <div className="mt-4">
                                        Transaction Hash: <code>{transactionHash}</code>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <button onClick={handleConnectWallet} className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600">
                                    Connect Wallet
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </>
        </Web3ReactProvider>
    );
}