
const pool = require('.')

const bcrypt = require('bcrypt');

const email = 'dt@ga.co';
const plainTextPassword = 'pudding';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(plainTextPassword, salt, (err, hash) => {
        const sql = `
            INSERT INTO users (email, password_digest)
            VALUES ('${email}', '${hash}')
            ;`
        pool.query(sql, (err, res) => {
            console.log(err);
        });
    });
});