const express = require('express');
const router = express.Router();

const pool = require('../db');

const loginCheck = require('../middlewares/login_check');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM dishes';

    pool.query(sql, (err, dbRes) => {
        const dishes = dbRes.rows;
        res.render('home', {dishes});
    });
});

router.get('/new', loginCheck, (req, res) => {
    res.render('share');
});

// route is http method + path
router.post('/', loginCheck, (req, res) => {
    if (!req.session.userId) {
        res.redirect('/login');
        return;
    }
    const sql = `
        INSERT INTO dishes (title, image_url)
        VALUES ($1, $2, $3);
    `;
    pool.query(sql, [req.body.title, req.body.image_url, req.session.userId], (err, dbRes) => {
        res.redirect('/dishes');
    });
});

router.get('/:id', (req, res) => {
    const sql = `SELECT * FROM dishes WHERE id = $1;`;
    pool.query(sql, [req.params.id], (err, dbRes) => {
        const dish = dbRes.rows[0];
        res.render('dish', {dish});
    });
});


router.get('/:id/edit', loginCheck, (req, res) => {
    const sql = `SELECT * FROM dishes WHERE id = $1;`;
    pool.query(sql, [req.params.id], (err, dbRes) => {
        // if (err) {
        //     console.log(err);
        //     res.redirect('/');
        //     return;
        // }
        const dish = dbRes.rows[0];
        res.render('edit', {dish});
    });
});

router.put('/:id', loginCheck, (req, res) => {
    const sql = `UPDATE dishes SET title = $1, image_url = $2 WHERE id = $3`;
    pool.query(sql, [req.body.title, req.body.image_url, req.params.id], (err, dbRes) => {
        res.redirect(`/dishes/${req.params.id}`);
    });
});


router.delete('/:id', loginCheck, (req, res) => {
    const sql = `DELETE FROM dishes WHERE id = $1;`;
    pool.query(sql, [req.params.id], (err, dbRes) => {
        res.redirect('/dishes');
    });
});

module.exports = router;