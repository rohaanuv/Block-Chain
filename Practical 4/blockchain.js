let hash = require('object-hash');
let validator = require('./validator');
let mongoose = require('mongoose');
let chalk = require('chalk');
let BlockChainModel = mongoose.model('Blockchain');

const TARGET_HASH = hash(1560);

class Blockchain {
  constructor() {
    //create
    this.chain = [];
    //transactions
    this.curr_transactions = [];
  }

  getLastBlock(callback) {
    //get lat block
    return BlockChainModel.findOne({},
      null, {
        sort: {
          _id: -1
        },
        limit: 1
      },
      (err, block) => {
        if (err) return console.error("cannot get last block ", err);
        return callback(block);
      })

  }

  addNewBlock(prevHash) {
    let block = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.curr_transactions,
      prevHash: prevHash
    };
    if (validator.proofOfWork() == TARGET_HASH) {
      this.getLastBlock((lastBlock) => {
        if (lastBlock) {
          block.prevHash = lastBlock.hash;
        }
        block.hash = hash(block);
        // Add it to the instance
        let newBlock = new BlockChainModel(block);
        //save to db
        newBlock.save(err => {
          if (err)
            return console.log(chalk.red('Cannot Save block to DB ', err));
          console.log(chalk.green('Block stored in DB'));
        });
        //log success
        //add to chain
        this.chain.push(block);
        this.curr_transactions = [];
        return block;
      });
    }
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