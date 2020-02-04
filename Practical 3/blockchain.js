let hash = require('object-hash');
class Blockchain {
    constructor() {
        //create
        this.chain = [];
        //transactions
        this.curr_transactions = [];
    }

    addNewBlock(pevHash) {
        let block = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.curr_transactions,
            pevHash: pevHash
        };
        //put hash sha256
        this.hash = hash(block);
        //add to chain
        this.chain.push(block);
        this.curr_transactions = [];
        return block;
    }
    addNewTranscation(sender, recipient, amount) {
        this.curr_transactions.push({
            sender,
            recipient,
            amount: amount
        });
    }
    lastBlock() {
        return this.chain.slice(-1)[0];
    }
    isEmpty() {
        return this.chain.length == 0;
    }
}

module.exports = Blockchain;