const Cache = require('node-cache')

const cache = new Cache({
  stdTTL: 300,
  checkperiod: 1,
  deleteOnExpire: false
})

