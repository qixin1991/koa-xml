'use strict'

const parse = require('./lib/xml')

const fn = function(options) {
  return function* (next) {
    let ctx = this
    if (ctx.is('xml')) {
      switch (ctx.method) {
        case 'PATCH':
        case 'POST':
        case 'PUT':
        case 'TRACE':
        ctx.request.body = yield parse(ctx.req, options)
        break
      }
    }

    yield next
  }
}

module.exports = fn
