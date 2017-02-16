const koa = require('koa2')
    , app = new koa()
    , Router = require('koa-router')
    , views = require('koa-views')
    , onerror = require('koa-onerror')
    , router = new Router()
    , convert = require('koa-convert')

app.use(convert(require('koa-static')(__dirname + '/public')))
app.use(views(__dirname + '/template', {
    extension: 'pug'
}))

app.use(async function (ctx, next){
    let start = new Date
    await next()
    let ms = new Date - start
    console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

const index = require('./routes/index')(__dirname)

app.use(index.routes())
    .use(index.allowedMethods())

app.on('error', function(err, ctx){
    console.log(err + ctx)
})


app.listen(3000)