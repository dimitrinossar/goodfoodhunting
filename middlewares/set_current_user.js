const pool = require('../db');

function setCurrentUser(req, res, next) {
    const {userId} = req.session;

    res.locals.currentUser = {};

    if (userId) {
        const sql = `SELECT id, email FROM users WHERE id = ${userId};`
        pool.query(sql, (err, dbRes) => {
        res.locals.currentUser = dbRes.rows[0];
        });
    }

    next();
}

module.exports = setCurrentUser;