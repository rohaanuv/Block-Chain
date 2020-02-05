let mongoose = require('mongoose');

let BlockChainModel = require("./model")

// connect to db
mongoose.connect("mongodb+srv://dev:dev@ron-4boms.gcp.mongodb.net/blockdb?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected");
    connectionCallback();
}).catch(err => {
    console.log(err)
})

let connectionCallback = () => {};

module.exports.onConnect = (callback) => {
    connectionCallback = callback;
}