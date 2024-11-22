// controllers/walletController.js
const Wallet = require('../models/wallet');

let wallets = [];

const createWallet = (req, res) => {
    const { owner } = req.body;
    const newWallet = new Wallet(owner);
    wallets.push(newWallet);
    res.status(201).json(newWallet);
};

const getWallet = (req, res) => {
    const wallet = wallets.find(w => w.id === req.params.id);
    if (wallet) {
        res.json(wallet);
    } else {
        res.status(404).json({ message: 'Wallet not found' });
    }
};

const getTransactionHistory = (req, res) => {
    const wallet = wallets.find(w => w.id === req.params.id);
    if (wallet) {
        res.json(wallet.transactions);
    } else {
        res.status(404).json({ message: 'Wallet not found' });
    }
};

const addCoin = (req, res) => {
    const wallet = wallets.find(w => w.id === req.params.id);
    const { coin, amount } = req.body;

    if (wallet) {
        wallet.coins[coin] = (wallet.coins[coin] || 0) + amount;
        wallet.balance += amount; // Atualiza o saldo total
        wallet.transactions.push({ type: 'ADD', coin, amount });
        res.json(wallet);
    } else {
        res.status(404).json({ message: 'Wallet not found' });
    }
};

const removeCoin = (req, res) => {
    const wallet = wallets.find(w => w.id === req.params.id);
    const { coin, amount } = req.body;

    if (wallet && wallet.coins[coin]) {
        if (wallet.coins[coin] >= amount) {
            wallet.coins[coin] -= amount;
            wallet.balance -= amount; // Atualiza o saldo total
            wallet.transactions.push({ type: 'REMOVE', coin, amount });
            res.json(wallet);
        } else {
            res.status(400).json({ message: 'Insufficient balance' });
        }
    } else {
        res.status(404).json({ message: 'Wallet not found or coin does not exist' });
    }
};

const transferCoin = (req, res) => {
    const { fromId, toId, coin, amount } = req.body;
    const fromWallet = wallets.find(w => w.id === fromId);
    const toWallet = wallets.find(w => w.id === toId);

    if (fromWallet && toWallet && fromWallet.coins[coin] >= amount) {
        fromWallet.coins[coin] -= amount;
        toWallet.coins[coin] = (toWallet.coins[coin] || 0) + amount;
        fromWallet.transactions.push({ type: 'TRANSFER_OUT', coin, amount, to: toId });
        toWallet.transactions.push({ type: 'TRANSFER_IN', coin, amount, from: fromId });
        res.json({ fromWallet, toWallet });
    } else {
        res.status(400).json({ message: 'Transfer failed: check wallet IDs and coin balance' });
    }
};

const deleteWallet = (req, res) => {
    const index = wallets.findIndex(w => w.id === req.params.id);
    if (index !== -1) {
        wallets.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Wallet not found' });
    }
};


const buyCoin = (req, res) => {
    const { walletId, coin, amount } = req.body;
    const wallet = wallets.find(w => w.id === walletId);

    if (wallet) {
        // Simulação de compra, onde o saldo da carteira aumenta
        wallet.coins[coin] = (wallet.coins[coin] || 0) + amount;
        wallet.balance += amount; // Atualiza o saldo total
        wallet.transactions.push({ type: 'BUY', coin, amount });
        res.json(wallet);
    } else {
        res.status(404).json({ message: 'Wallet not found' });
    }
};

const sellCoin = (req, res) => {
    const { walletId, coin, amount } = req.body;
    const wallet = wallets.find(w => w.id === walletId);

    if (wallet && wallet.coins[coin] >= amount) {
        // Simulação de venda, onde o saldo da carteira diminui
        wallet.coins[coin] -= amount;
        wallet.balance -= amount; // Atualiza o saldo total
        wallet.transactions.push({ type: 'SELL', coin, amount });
        res.json(wallet);
    } else {
        res.status(400).json({ message: 'Insufficient balance or wallet not found' });
    }
};

module.exports = {
    createWallet,
    getWallet,
    getTransactionHistory,
    addCoin,
    removeCoin,
    transferCoin,
    deleteWallet,
    buyCoin,
    sellCoin
};