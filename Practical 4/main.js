let db = require('./db/index');
db.onConnect(() => {
  let Blockchain = require('./blockchain');

  let blockchain = new Blockchain();

  let hash = require('object-hash');

  blockchain.addNewTranscation("Sham", "Ram", 201);
  blockchain.addNewBlock();
  console.log('Chain : ', blockchain.chain);
});