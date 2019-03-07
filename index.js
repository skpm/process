var toObject = require('util').toObject

var currentLocale = (function currentLocale() {
  // NSLocale.currentLocale() only returns the language that is supported by the host application
  var languageCode = String(NSLocale.preferredLanguages()[0]).split('-')[0]
  if (!languageCode) {
    return undefined
  }
  var countryCode = String(NSLocale.currentLocale().localeIdentifier()).split('_')[1]
  if (!countryCode) {
    return languageCode
  }
  return languageCode + '-' + countryCode
})()

module.exports = {
  get title()  {
    return String(__command.name())
  },
  get version()  {
    var pluginBundle = __command.pluginBundle()
    return pluginBundle ? String(pluginBundle.version()) : '0.0.0'
  },
  get versions() {
    var pluginBundle = __command.pluginBundle()
    return {
      plugin: pluginBundle ? String(pluginBundle.version()) : '0.0.0',
      sketch: MSApplicationMetadata.metadata().appVersion
    }
  },
  arch: "x64",
  platform: "darwin",
  get env() {
    var env = toObject(NSProcessInfo.processInfo().environment())
    var pluginBundle = __command.pluginBundle()
    env.command = __command
    if (pluginBundle) {
      env.plugin = pluginBundle
    }
    if (currentLocale) {
      env.LANG = currentLocale
    }
    return env
  },
  get pid() {
    return __command.identifier
  },
  execPath: String(NSBundle.mainBundle().executablePath()),
  type: "sketch",
  nextTick: typeof setImmediate !== 'undefined' ? setImmediate : undefined
}
