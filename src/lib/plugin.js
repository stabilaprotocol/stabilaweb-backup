import StabilaWeb from 'index';
import utils from 'utils';
import semver from 'semver';

export default class Plugin {

    constructor(stabilaWeb = false, options = {}) {
        if (!stabilaWeb || !stabilaWeb instanceof StabilaWeb)
            throw new Error('Expected instance of StabilaWeb');
        this.stabilaWeb = stabilaWeb;
        this.pluginNoOverride = ['register'];
        this.disablePlugins = options.disablePlugins;
    }

    register(Plugin, options) {
        let pluginInterface = {
            requires: '0.0.0',
            components: {}
        }
        let result = {
            libs: [],
            plugged: [],
            skipped: []
        }
        if (this.disablePlugins) {
            result.error = 'This instance of StabilaWeb has plugins disabled.'
            return result;
        }
        const plugin = new Plugin(this.stabilaWeb)
        if (utils.isFunction(plugin.pluginInterface)) {
            pluginInterface = plugin.pluginInterface(options)
        }
        if (semver.satisfies(StabilaWeb.version, pluginInterface.requires)) {
            if (pluginInterface.fullClass) {
                // plug the entire class at the same level of stabilaWeb.stb
                let className = plugin.constructor.name
                let classInstanceName = className.substring(0, 1).toLowerCase() + className.substring(1)
                if (className !== classInstanceName) {
                    StabilaWeb[className] = Plugin
                    this.stabilaWeb[classInstanceName] = plugin
                    result.libs.push(className)
                }
            } else {
                // plug methods into a class, like stb
                for (let component in pluginInterface.components) {
                    if (!this.stabilaWeb.hasOwnProperty(component)) {
                        continue
                    }
                    let methods = pluginInterface.components[component]
                    let pluginNoOverride = this.stabilaWeb[component].pluginNoOverride || []
                    for (let method in methods) {
                        if (method === 'constructor' || (this.stabilaWeb[component][method] &&
                            (pluginNoOverride.includes(method) // blacklisted methods
                                || /^_/.test(method)) // private methods
                        )) {
                            result.skipped.push(method)
                            continue
                        }
                        this.stabilaWeb[component][method] = methods[method].bind(this.stabilaWeb[component])
                        result.plugged.push(method)
                    }
                }
            }
        } else {
            throw new Error('The plugin is not compatible with this version of StabilaWeb')
        }
        return result
    }
}

