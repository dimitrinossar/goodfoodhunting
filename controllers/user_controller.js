const express = require('express');
const router = express.Router();

const {Pool} = require('pg');
const pool = new Pool({
    database: 'goodfoodhunting'
});

/*
router.get('/') // list of users
router.post('/') // create user
router.get('/:id') // get single user
router.get('/:id/edit') // edit single user
router.put('/:id') // update single user
router.delete('/:id') // delete single user
*/