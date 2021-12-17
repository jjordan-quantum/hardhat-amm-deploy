exports.printReceipt = function(receipt, abiDecoder) {

    _printShallowReceipt(receipt);
    console.log("EVENTS:");
    _printDecodedLogs(receipt, abiDecoder);
}

exports.printShallowReceipt = function(receipt) {

    _printShallowReceipt(receipt)
}

function _printShallowReceipt(receipt) {

    const keys = Object.keys(receipt);
    const shallowReceipt = {}
    for(let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if(key === 'logs' || key === 'events') {
            shallowReceipt[key] = receipt[key].length
        } else {
            shallowReceipt[key] = receipt[key]
        }
    }
    console.log(shallowReceipt);
}

exports.printDecodedLogs = function(receipt, abiDecoder) {

    _printDecodedLogs(receipt, abiDecoder)
}

function _printDecodedLogs(receipt, abiDecoder) {

    const util = require('util');
    console.log(util.inspect(abiDecoder.decodeLogs(receipt.logs), false, null, true));
}