
const {Client} = require('pg');
const client = new Client({
    database: 'goodfoodhunting'
});

const bcrypt = require('bcrypt');

const email = 'dt@ga.co';
const plainTextPassword = 'pudding';

client.connect();

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(plainTextPassword, salt, (err, hash) => {
        const sql = `
            INSERT INTO users (email, password_digest)
            VALUES ('${email}', '${hash}')
            ;`
        client.query(sql, (err, res) => {
            console.log(err);
            client.end();
        });
    });
});