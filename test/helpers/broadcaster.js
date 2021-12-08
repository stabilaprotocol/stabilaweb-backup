const stabilaWebBuilder = require('../helpers/stabilaWebBuilder');

module.exports = async function (func, pk, transaction) {
    const stabilaWeb = stabilaWebBuilder.createInstance();
    if( !transaction) {
        transaction = await func;
    }
    const signedTransaction = await stabilaWeb.stb.sign(transaction, pk);
    const result = {
        transaction,
        signedTransaction,
        receipt: await stabilaWeb.stb.sendRawTransaction(signedTransaction)
    };
    return Promise.resolve(result);
}
