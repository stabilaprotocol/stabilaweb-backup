
let someParameter

class GetNowBlock {

    constructor(stabilaWeb = false) {
        if (!stabilaWeb)
            throw new Error('Expected instance of StabilaWeb');

        this.stabilaWeb = stabilaWeb;
    }

    async someMethod(callback = false) {

        if(!callback)
            return this.injectPromise(this.getCurrentBlock);

        this.stabilaWeb.fullNode.request('wallet/getnowblock').then(block => {
            block.fromPlugin = true
            callback(null, block);
        }).catch(err => callback(err));
    }

    getSomeParameter() {
        return someParameter;
    }

    pluginInterface(options) {
        if (options.someParameter) {
            someParameter = options.someParameter
        }
        return {
            requires: '^4.0.0',
            components: {
                stb: {
                    // will be overridden
                    getCurrentBlock: this.someMethod,

                    // will be added
                    getLatestBlock: this.someMethod,
                    getSomeParameter: this.getSomeParameter,

                    // will be skipped
                    _parseToken: function () {}


                }
            }
        }
    }
}

module.exports = GetNowBlock
