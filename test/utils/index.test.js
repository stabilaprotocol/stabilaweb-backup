const chai = require('chai');
const stabilaWebBuilder = require('../helpers/stabilaWebBuilder');
const StabilaWeb = stabilaWebBuilder.StabilaWeb;
const BigNumber = require('bignumber.js');

const assert = chai.assert;

describe('StabilaWeb.utils', function () {

    describe("#isValidURL()", function () {

        it('should verify good urls', function () {

            const stabilaWeb = stabilaWebBuilder.createInstance();

            assert.isTrue(stabilaWeb.utils.isValidURL('https://some.example.com:9090/casa?qe=3'))
            assert.isTrue(stabilaWeb.utils.isValidURL('www.example.com/welcome'))

            assert.isFalse(stabilaWeb.utils.isValidURL('http:/some.example.com'))

            assert.isFalse(stabilaWeb.utils.isValidURL(['http://example.com']))

        })

    });

    describe("#isArray()", function () {

        it('should verify that a value is an array', function () {
            const stabilaWeb = stabilaWebBuilder.createInstance();

            assert.isTrue(stabilaWeb.utils.isArray([]));
            assert.isTrue(stabilaWeb.utils.isArray([[2], {a: 3}]));

            assert.isFalse(stabilaWeb.utils.isArray({}));
            assert.isFalse(stabilaWeb.utils.isArray("Array"));

        })

    });


    describe("#isJson()", function () {

        it('should verify that a value is a JSON string', function () {
            const stabilaWeb = stabilaWebBuilder.createInstance();

            assert.isTrue(stabilaWeb.utils.isJson('[]'));
            assert.isTrue(stabilaWeb.utils.isJson('{"key":"value"}'));
            assert.isTrue(stabilaWeb.utils.isJson('"json"'));

            assert.isFalse(stabilaWeb.utils.isJson({}));
            assert.isFalse(stabilaWeb.utils.isJson("json"));

        })

    });

    describe("#isBoolean()", function () {

        it('should verify that a value is a JSON string', function () {
            const stabilaWeb = stabilaWebBuilder.createInstance();

            assert.isTrue(stabilaWeb.utils.isBoolean(true));
            assert.isTrue(stabilaWeb.utils.isBoolean('a' == []));

            assert.isFalse(stabilaWeb.utils.isBoolean({}));
            assert.isFalse(stabilaWeb.utils.isBoolean("json"));

        })

    });

    describe("#isBigNumber()", function () {

        it('should verify that a value is a JSON string', function () {
            const stabilaWeb = stabilaWebBuilder.createInstance();

            const bigNumber = BigNumber('1234565432123456778765434456777')

            assert.isTrue(stabilaWeb.utils.isBigNumber(bigNumber));

            assert.isFalse(stabilaWeb.utils.isBigNumber('0x09e80f665949b63b39f3850127eb29b55267306b69e2104c41c882e076524a1c'));
            assert.isFalse(stabilaWeb.utils.isBigNumber({}));
            assert.isFalse(stabilaWeb.utils.isBigNumber("json"));

        })

    });


    describe("#isString()", function () {

        it('should verify that a valyue is a string', function () {
            const stabilaWeb = stabilaWebBuilder.createInstance();

            assert.isTrue(stabilaWeb.utils.isString('str'));
            assert.isTrue(stabilaWeb.utils.isString(13..toString()));

            assert.isFalse(stabilaWeb.utils.isString(2));

        })

    });

    describe("#isFunction()", function () {

        it('should verify that a value is a function', function () {
            const stabilaWeb = stabilaWebBuilder.createInstance();

            assert.isTrue(stabilaWeb.utils.isFunction(new Function()));
            assert.isTrue(stabilaWeb.utils.isFunction(() => {
            }));
            assert.isTrue(stabilaWeb.utils.isFunction(stabilaWeb.utils.isFunction));

            assert.isFalse(stabilaWeb.utils.isFunction({function: new Function}));

        })

    });

    describe('#isHex()', function () {
        it('should verify that a string is an hex string', function () {

            const stabilaWeb = stabilaWebBuilder.createInstance();

            let input = '0x1';
            let expected = true;
            assert.equal(stabilaWeb.utils.isHex(input), expected);

            input = '0x0';
            expected = true;
            assert.equal(stabilaWeb.utils.isHex(input), expected);

            input = '0x73616c616d6f6e';
            expected = true;
            assert.equal(stabilaWeb.utils.isHex(input), expected);

            input = '73616c616d6f';
            expected = true;
            assert.equal(stabilaWeb.utils.isHex(input), expected);

            input = '0x73616c616d6fsz';
            expected = false;
            assert.equal(stabilaWeb.utils.isHex(input), expected);

            input = 'x898989';
            expected = false;
            assert.equal(stabilaWeb.utils.isHex(input), expected);

        });

    });

    describe("#isInteger()", function () {

        it('should verify that a value is an integer', function () {
            const stabilaWeb = stabilaWebBuilder.createInstance();

            assert.isTrue(stabilaWeb.utils.isInteger(2345434));
            assert.isTrue(stabilaWeb.utils.isInteger(-234e4));

            assert.isFalse(stabilaWeb.utils.isInteger(3.4));
            assert.isFalse(stabilaWeb.utils.isInteger('integer'));

        })

    });

    describe("#hasProperty()", function () {

        it('should verify that an object has a specific property', function () {
            const stabilaWeb = stabilaWebBuilder.createInstance();

            assert.isTrue(stabilaWeb.utils.hasProperty({p: 2}, 'p'));
            assert.isFalse(stabilaWeb.utils.hasProperty([{p: 2}], 'p'));

            assert.isFalse(stabilaWeb.utils.hasProperty({a: 2}, 'p'));

        })

    });

    describe("#hasProperties()", function () {

        it('should verify that an object has some specific properties', function () {
            const stabilaWeb = stabilaWebBuilder.createInstance();

            assert.isTrue(stabilaWeb.utils.hasProperties({p: 2, s: 2}, 'p', 's'));

            assert.isFalse(stabilaWeb.utils.hasProperties({p: 2, s: 2}, 'p', 'q'));

        })

    });


    describe("#mapEvent()", function () {

        it('should map an event result', function () {
            const stabilaWeb = stabilaWebBuilder.createInstance();

            const event = {
                block_number: 'blockNumber',
                block_timestamp: 'blockTimestamp',
                contract_address: 'contractAddress',
                event_name: 'eventName',
                transaction_id: 'transactionId',
                result: 'result',
                resource_Node: 'resourceNode'
            }

            const expected = {
                block: 'blockNumber',
                timestamp: 'blockTimestamp',
                contract: 'contractAddress',
                name: 'eventName',
                transaction: 'transactionId',
                result: 'result',
                resourceNode: 'resourceNode'
            }

            const mapped = stabilaWeb.utils.mapEvent(event)
            for(let key in mapped) {
                assert.equal(mapped[key], expected[key])
            }

        })

    });

    describe('#parseEvent', function () {
        // TODO
    });

    describe("#padLeft()", function () {

        it('should return the pad left of a string', function () {
            const stabilaWeb = stabilaWebBuilder.createInstance();

            assert.equal(stabilaWeb.utils.padLeft('09e80f', '0', 12), '00000009e80f');
            // assert.equal(stabilaWeb.utils.padLeft(new Function, '0', 32), '0000000function anonymous() {\n\n}');
            assert.equal(stabilaWeb.utils.padLeft(3.4e3, '0', 12), '000000003400');

        })

    });

    describe("#ethersUtils()", function () {

        it('should import sha256 from ethers and has a string', function () {
            const stabilaWeb = stabilaWebBuilder.createInstance();

            const string = '0x' + Buffer.from('some string').toString('hex');
            const hash = stabilaWeb.utils.ethersUtils.sha256(string);

            assert.equal(hash, '0x61d034473102d7dac305902770471fd50f4c5b26f6831a56dd90b5184b3c30fc');

        })

    });

});
