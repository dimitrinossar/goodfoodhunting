const logger = function(req, res, next) {
    console.log(`${req.method} ${req.url} ${new Date().toUTCString()}`);
    next();
}

module.exports = logger;