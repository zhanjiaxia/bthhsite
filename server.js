var serve = require('koa-static')
var proxy = require('koa-proxy')
var koa = require('koa')
var views = require('koa-views')
var extend = require('extend')

var argv = require('minimist')(process.argv.slice(2))

var proxyhost = ~argv._.indexOf('proxy') && argv._[argv._.indexOf('proxy') + 1]

var localOpts = {}

if (proxyhost)
  localOpts.proxy = proxyhost

var opts = extend(true, {
  proxy: 'http://0.0.0.0:3333',
  host: '0.0.0.0',
  port: 8888
}, localOpts)

var app = koa({ host: opts.host })

app.use(views('./build', { extensions: 'html' }))

app.use(serve('./build'))

app.use(proxy({
  host: opts.proxy,
  match: /^\/services\//
}))

// 404 fallback(like) to index.html
app.use(function* (next) {
  yield next
  if (this.status == 404)
    yield this.render('/index.html')
})

app.listen(opts.port)

console.log(
`
${opts.host}:${opts.port}
/services/* proxy to ${opts.proxy}
404 fallback to index.html
`
)

