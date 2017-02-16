const router = require('koa-router')()

const render = function(dirname) {
    return router.get('/', async function(ctx, next){
        await ctx.render('index', {
            dirname: dirname
        })
    })
}

module.exports = render