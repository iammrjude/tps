import Head from "next/head";
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import contractAbi from '../abis/contractAbi';
import { useWeb3React } from '@web3-react/core'
import { injected } from "@/components/wallet/connectors";
import currentGasPrice from "@/components/wallet/gasPrice";
import Decimal from "decimal.js";

export default function TranscriptPaymentPage() {
    const { account, active, activate, chainId, connector, library, deactivate } = useWeb3React()
    const [amount, setAmount] = useState(0);
    // const [contractAddress, setContractAddress] = useState('');
    // const contractAddress = "0x57b5cCb71Bb1BdF0460b8A5819C354AD8087673d"; // 80001
    const contractAddress = "0x4ca9D931f24E0292226e895bd0beB8aD979A5631"; // 97
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const [transactionHash, setTransactionHash] = useState('');

    async function handleWalletConnect() {
        try {
            // await activate(injected, undefined, true);
            await activate(injected);
        } catch (error) {
            console.error("Error while trying to connect wallet:", error);
        }
    }

    function convertToWei(number) {
        const dividend = new Decimal(`${number}`);
        const divisor = new Decimal(`${1E18}`);
        const inWei = dividend.div(divisor);
        return inWei;
    }

    async function handlePayment() {
        try {
            const contract = new library.eth.Contract(contractAbi, library.utils.toChecksumAddress(contractAddress));
            const gasPrice = await currentGasPrice(library);
            const amountInWei = convertToWei(amount);
            const paymentTx = await contract.methods.requestTranscript({ value: 17500 }).send({ from: account, gasPrice: gasPrice });
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
            const contract = new library.eth.Contract(contractAbi, library.utils.toChecksumAddress(contractAddress));
            const isPaid = await contract.methods.paidStudents(account).call();
            setPaymentConfirmed(isPaid);
        } catch (error) {
            console.error("Failed to check payment status:", error);
        }
    }

    async function fetchTranscriptPrice() {
        try {
            const contract = new library.eth.Contract(contractAbi, library.utils.toChecksumAddress(contractAddress));
            const price = await contract.methods.transcriptPrice().call();
            setAmount(Number(price));
        } catch (error) {
            console.error("Failed to fetch transcript price:", error);
        }
    }

    useEffect(() => {
        if (library && library.eth && account) {
            checkPaymentStatus();
            fetchTranscriptPrice();
        }
    }, [account, library]);

    return (
        <>
            <Head>
                <title>Pay Fee - Transcript Processing System</title>
                <link href="/images/icon.png" rel="shortcut icon" type="image/x-icon" />
            </Head>

            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Transcript Payment</h2>
                    {account ? (
                        <>
                            <div className="mb-4">
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                    Amount
                                </label>
                                <input
                                    id="amount"
                                    type="number"
                                    step="100"
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
                            <button onClick={handleWalletConnect} className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600">
                                Connect Wallet
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}