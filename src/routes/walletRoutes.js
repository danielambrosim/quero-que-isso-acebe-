// routes/walletRoutes.js
const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

router.post('/wallets', walletController.createWallet);
router.get('/wallets/:id', walletController.getWallet);
router.post('/wallets/:id/add', walletController.addCoin);
router.post('/wallets/:id/remove', walletController.removeCoin);
router.post('/transfer', walletController.transferCoin);
router.delete('/wallets/:id', walletController.deleteWallet);
router.get('/wallets/:id/transactions', walletController.getTransactionHistory);
router.post('/wallets/:id/buy', walletController.buyCoin);
router.post('/wallets/:id/sell', walletController.sellCoin);

module.exports = router;