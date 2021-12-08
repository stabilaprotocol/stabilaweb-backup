const chai = require('chai');
const {ADDRESS_HEX, ADDRESS_BASE58} = require('../helpers/config');
const stabilaWebBuilder = require('../helpers/stabilaWebBuilder');

const assert = chai.assert;

describe('StabilaWeb.utils.accounts', function () {

    describe('#generateAccount()', function () {

        it("should generate a new account", async function () {
            const stabilaWeb = stabilaWebBuilder.createInstance();

            const newAccount = await stabilaWeb.utils.accounts.generateAccount();
            assert.equal(newAccount.privateKey.length, 64);
            assert.equal(newAccount.publicKey.length, 130);
            let address = stabilaWeb.address.fromPrivateKey(newAccount.privateKey);
            assert.equal(address, newAccount.address.base58);

            assert.equal(stabilaWeb.address.toHex(address), newAccount.address.hex.toLowerCase());
        });
    });
});
