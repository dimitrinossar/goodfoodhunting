const express = require('express');
const router = express.Router();

const pool = require('../db');
const bcrypt = require('bcrypt');

/*
router.get('/') // list of users
router.post('/') // create user
router.get('/:id') // get single user
router.get('/:id/edit') // edit single user
router.put('/:id') // update single user
router.delete('/:id') // delete single user
*/

router.post('/', (req, res) => {
    const checkSql = `SELECT * FROM users WHERE email = $1;`;
    pool.query(checkSql, [req.body.email], (err, checkRes) => {
        if (checkRes.rows.length !== 0) {
            res.redirect('/login');
            return;
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                const insertSql = `
                    INSERT INTO users (email, password_digest)
                    VALUES ($1, $2)
                    RETURNING id;
                `;
                pool.query(insertSql, [req.body.email, hash], (err, insertRes) => {
                    req.session.userId = insertRes.rows[0].id;
                    res.redirect('/dishes');
                });
            });
        });
    });
});

module.exports = router;