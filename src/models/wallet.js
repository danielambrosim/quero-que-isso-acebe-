// models/wallet.js
const { v4: uuidv4 } = require('uuid');

class Wallet {
    constructor(owner) {
        this.id = uuidv4();
        this.owner = owner;
        this.balance = 0; // Saldo em uma moeda padrão
        this.coins = {}; // Armazena as criptomoedas e seus saldos
        this.transactions = []; // Armazena o histórico de transações
    }
}

module.exports = Wallet;