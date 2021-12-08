const chai = require('chai');
const {FULL_NODE_API} = require('../helpers/config');
const assertThrow = require('../helpers/assertThrow');
const stabilaWebBuilder = require('../helpers/stabilaWebBuilder');
const StabilaWeb = stabilaWebBuilder.StabilaWeb;
const GetNowBlock = require('../helpers/GetNowBlock');
const BlockLib = require('../helpers/BlockLib');
const jlog = require('../helpers/jlog')

const assert = chai.assert;

describe('StabilaWeb.lib.plugin', async function () {

    let stabilaWeb;

    before(async function () {
        stabilaWeb = stabilaWebBuilder.createInstance();
    });

    describe('#constructor()', function () {

        it('should have been set a full instance in stabilaWeb', function () {

            assert.instanceOf(stabilaWeb.plugin, StabilaWeb.Plugin);
        });

    });

    describe("#plug GetNowBlock into stabilaWeb.stb", async function () {

        it('should register the plugin GetNowBlock', async function () {

            const someParameter = 'someValue'

            let result = stabilaWeb.plugin.register(GetNowBlock, {
                someParameter
            })
            assert.isTrue(result.skipped.includes('_parseToken'))
            assert.isTrue(result.plugged.includes('getCurrentBlock'))
            assert.isTrue(result.plugged.includes('getLatestBlock'))

            result = await stabilaWeb.stb.getCurrentBlock()
            assert.isTrue(result.fromPlugin)
            assert.equal(result.blockID.length, 64)
            assert.isTrue(/^00000/.test(result.blockID))

            result = await stabilaWeb.stb.getSomeParameter()
            assert.equal(result, someParameter)

        })

    });

    describe("#plug BlockLib into stabilaWeb at first level", async function () {

        it('should register the plugin and call a method using a promise', async function () {

            let result = stabilaWeb.plugin.register(BlockLib)
            assert.equal(result.libs[0], 'BlockLib')
            result = await stabilaWeb.blockLib.getCurrent()
            assert.isTrue(result.fromPlugin)
            assert.equal(result.blockID.length, 64)
            assert.isTrue(/^00000/.test(result.blockID))

        })

        it('should register and call a method using callbacks', async function () {

            stabilaWeb.plugin.register(BlockLib)
            return new Promise(resolve => {
                stabilaWeb.blockLib.getCurrent((err, result) => {
                    assert.isTrue(result.fromPlugin)
                    assert.equal(result.blockID.length, 64)
                    assert.isTrue(/^00000/.test(result.blockID))
                    resolve()
                })
            })
        })

        it('should not register if stabilaWeb is instantiated with the disablePlugins option', async function () {

            let stabilaWeb2 = stabilaWebBuilder.createInstance({disablePlugins: true});
            let result = stabilaWeb2.plugin.register(BlockLib);
            assert.isTrue(typeof result.error === 'string');

        })


    });

});
