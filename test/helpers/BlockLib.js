
const injectPromise = require('injectpromise')

class BlockLib {

    constructor(stabilaWeb = false) {
        if (!stabilaWeb)
            throw new Error('Expected instances of StabilaWeb and utils');
        this.stabilaWeb = stabilaWeb;
        this.injectPromise = injectPromise(this);
    }

    async getCurrent(callback = false) {

        if (!callback)
            return this.injectPromise(this.getCurrent);

        this.stabilaWeb.fullNode.request('wallet/getnowblock').then(block => {
            block.fromPlugin = true
            callback(null, block);
        }).catch(err => callback(err));
    }

    pluginInterface() {
        return {
            requires: '^4.0.0',
            fullClass: true
        }
    }
}

module.exports = BlockLib
