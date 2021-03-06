'use strict';

const debug = require('debug')('webpack-universal-renderer-middleware');
const requireFromString = require('require-from-string');
const MultiCompiler = require('webpack/lib/MultiCompiler');

function findCompiler(multiCompiler, name) {
    return multiCompiler.compilers.find(compiler => compiler.name === name);
}

function findStats(multiStats, name) {
    return multiStats.stats.find(stats => stats.compilation.name === name);
}

/**
 * Passes the request to the most up to date server bundle.
 * NOTE: This depends on being mounted after webpackDevMiddleware which will ensure
 * this middleware doesn't get called until the compilation is complete.
 * @param  {MultiCompiler} multiCompiler e.g webpack([clientConfig, serverConfig])
 * @return {Function}                    Middleware fn.
 */
function webpackUniversalRenderer(multiCompiler, options) {
    debug('Using webpack-universal-renderer-middleware');

    if (!multiCompiler instanceof  MultiCompiler) {
        throw new Error('Expected webpack compiler to contain both a `client` and `server` config');
    }

    const serverCompiler = findCompiler(multiCompiler, 'server');
    const clientCompiler = findCompiler(multiCompiler, 'client');

    if (!serverCompiler) {
        throw new Error('Expected a webpack compiler named `server`');
    }
    if (!clientCompiler) {
        throw new Error('Expected a webpack compiler named `client`');
    }

    const outputFs = serverCompiler.outputFileSystem;

    let universalRenderer;
    let error = false;

    multiCompiler.plugin('done', multiStats => {
        const clientStats = findStats(multiStats, 'client');
        const serverStats = findStats(multiStats, 'server');
        // Server compilation errors need to be propagated to the client.
        if (serverStats.compilation.errors.length) {
            error = serverStats.compilation.errors[0];
            return;
        }
        error = false;
        try {
            const data = outputFs.readFileSync(options.universalRendererPath);
            universalRenderer = requireFromString(data.toString()).default(clientStats.toJson());
        } catch (e) {
            debug(`Error: ${e}`);
            error = e;
        }
    });

    return (req, res, next) => {
        debug(`Receive request ${req.url}`);
        if (error) {
            throw error;
        }
        universalRenderer(req, res, next);
    };
}

module.exports = webpackUniversalRenderer;
