
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./quickswap-sdk.cjs.production.min.js')
} else {
  module.exports = require('./quickswap-sdk.cjs.development.js')
}
