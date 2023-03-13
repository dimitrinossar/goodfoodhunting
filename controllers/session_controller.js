const express = require('express');
const router = express.Router();

const pool = require('../db');

const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
    const {email, password} = req.body;
    const sql = `SELECT * FROM users WHERE email = $1;`;
    pool.query(sql, [email], (err, dbRes) => {
        if (dbRes.rows.length === 0) {
            res.redirect('/login');
        }
        else {
            const user = dbRes.rows[0];
            bcrypt.compare(password, user.password_digest, (err, result) => {
                if (result) {
                    req.session.userId = user.id;
                    res.redirect('/dishes');
                }
                else {
                    res.redirect('/login');
                }
            });
        }
    });

});

router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

module.exports = router;