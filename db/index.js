// If you're working on a web application or other software which makes frequent queries you'll want to use a connection pool
const {Pool} = require('pg');

const config = {
  dev: {
    database: 'goodfoodhunting'
  },
  prod: {
    connectionString: process.env.DATABASE_URL
  }
}

// The pool is initially created empty and will create new clients lazily as they are needed
module.exports = new Pool(process.env.DATABASE_URL ? config.prod : config.dev);