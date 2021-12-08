const stabilaWebBuilder = require('./stabilaWebBuilder');
const stabilaWeb = stabilaWebBuilder.createInstance();
const wait = require('./wait');
const chalk = require('chalk');
const jlog = require('./jlog');

function log(x) {
    process.stdout.write(chalk.yellow(x))
}

module.exports = async function (type, ...params) {
    let startTimestamp = Date.now();
    let timeLimit = 5000;
    do {
        let data;
        let isFound = false;
        try {
            switch (type) {
                case 'tx': {
                    data = await stabilaWeb.stb.getTransaction(params[0]);
                    isFound = !!data.txID;
                    break;
                }
                case 'account': {
                    data = await stabilaWeb.stb.getUnconfirmedAccount(params[0]);
                    isFound = !!data.address;
                    break;
                }
                case 'accountById': {
                    data = await stabilaWeb.stb.getUnconfirmedAccountById(params[0]);
                    isFound = !!data.address;
                    break;
                }
                case 'token': {
                    data = await stabilaWeb.stb.getTokensIssuedByAddress(params[0]);
                    isFound = !!Object.keys(data).length;
                    break;
                }
                case 'tokenById': {
                    data = await stabilaWeb.stb.getTokenFromID(params[0]);
                    isFound = !!data.name;
                    break;
                }
                case 'sendToken': {
                    data = await stabilaWeb.stb.getUnconfirmedAccount(params[0]);
                    isFound = data && data.assetV2 && data.assetV2.length && data.assetV2[0].value !== params[1];
                    break;
                }
                case 'balance': {
                    data = await stabilaWeb.stb.getUnconfirmedBalance(params[0]);
                    isFound = (data !== params[1]);
                    break;
                }
                case 'cdBp': {
                    data = await stabilaWeb.stb.getUnconfirmedAccount(params[0]);
                    isFound = data.cded && (data.cded[0].cded_balance !== params[1]);
                    break;
                }
                case 'cdUcr': {
                    data = await stabilaWeb.stb.getUnconfirmedAccount(params[0]);
                    isFound = data.account_resource &&
                        data.account_resource.cded_balance_for_ucr &&
                        (data.account_resource.cded_balance_for_ucr.cded_balance !== params[1]);
                    break;
                }
                case 'contract': {
                    data = await stabilaWeb.stb.getContract(params[0]);
                    isFound = !!data.contract_address;
                    break;
                }
                case 'exchange': {
                    data = await stabilaWeb.stb.getExchangeByID(params[0]);
                    isFound = !!data.exchange_id;
                    break;
                }
                default:
                    isFound = true;

            }
        } catch (e) {
            log(e);
            await wait(1);
            continue;
        }
        // console.log(...params, 'wait for chain data result: ', isFound, data, type);
        if (isFound)
            return;
        log(`waiting for unconfirmed data,${type}...`);
        await wait(1);

    } while (Date.now() - startTimestamp < timeLimit);

    throw new Error('No unconfirmed data found on chain');
};
