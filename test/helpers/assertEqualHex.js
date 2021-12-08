const assert = require('chai').assert;
const stabilaWebBuilder = require('./stabilaWebBuilder');

module.exports = async function (result, string) {

    assert.equal(
        result,
        stabilaWebBuilder.getInstance().toHex(string).substring(2)
    )
}
