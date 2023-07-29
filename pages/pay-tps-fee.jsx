import Head from "next/head";
import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import contractAbi from '@/abis/contractAbi';
import { useWeb3React } from '@web3-react/core'
import { injected } from "@/components/wallet/connectors";
import currentGasPrice from "@/components/wallet/gasPrice";
import Decimal from "decimal.js";
import Link from "next/link";
import { useRouter } from 'next/router';

export default function TranscriptPaymentPage() {
    const router = useRouter();
    const { account, active, activate, chainId, connector, library, deactivate } = useWeb3React()
    const [amount, setAmount] = useState(0);
    const contractAddress = "0x04F5f58DB4832e53A55a49c273FF00541a6Cf45C"; // 97
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const [transactionHash, setTransactionHash] = useState('');

    async function handleWalletConnect() {
        try {
            await activate(injected);
        } catch (error) {
            console.error("Error while trying to connect wallet:", error);
        }
    }

    async function handlePayment() {
        try {
            const contract = new library.eth.Contract(contractAbi, library.utils.toChecksumAddress(contractAddress));
            const gasPrice = await currentGasPrice(library);
            const hasAlreadyPaid = paymentConfirmed;
            if (hasAlreadyPaid === true) {
                alert("You Have Already Paid The Transcript Processing Fee");
                // update payment status in database
                const studentEmail = sessionStorage.getItem('studentEmail');
                updatePaymentStatus(studentEmail, 'paid');
                alert("Redirecting to tps-dashboard ........");
                // redirect back to tps-dashboard
                return router.push('/tps-dashboard');
            }
            const amountToPay = await library.utils.toWei(amount, 'gwei');
            await contract.methods.requestTranscript({ value: amountToPay.toString() }).send({ from: account, gasPrice: gasPrice })
                .on('transactionHash', txHash => {
                    const bscScanUrl = `https://testnet.bscscan.com/tx/${txHash}`;
                    setTransactionHash(bscScanUrl);
                    alert(`Payment Successful, Please wait for Verification Message`);
                })
                .on('receipt', r => {
                    setPaymentConfirmed(true);
                })
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
            const price = await contract.methods.processingFee().call();
            setAmount(Number(price));
        } catch (error) {
            console.error("Failed to fetch transcript price:", error);
        }
    }

    async function updatePaymentStatus(email, paymentStatus) {
        try {
            const data = { email, paymentStatus };
            await fetch(`/api/update-payment-status`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error('Error while trying to save progress:', error);
        }
    }

    useEffect(() => {
        if (library && library.eth && account) {
            checkPaymentStatus();
            fetchTranscriptPrice();
        }
    }, [account, library]);

    useEffect(() => {
        if (paymentConfirmed === true && !(transactionHash === '')) {
            alert(`Payment Successful!!\nView your Transaction Receipt at: ${transactionHash}`);
            // update payment status in database
            const studentEmail = sessionStorage.getItem('studentEmail');
            updatePaymentStatus(studentEmail, 'paid');
            alert("Redirecting to tps-dashboard ........");
            // redirect back to tps-dashboard
            router.push('/tps-dashboard');
        }
    }, [paymentConfirmed, transactionHash]);

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
                                <div className="container mt-4">
                                    <p className="truncate">Transaction Hash: <code><Link href={transactionHash}>{transactionHash}</Link></code></p>
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