require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');
const argon2 = require('argon2');
// const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);
app.use(express.json());

app.post('/api/auth/sign-up', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(400, 'email and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("email", "password")
        values ($1, $2)
        returning *
      `;
      const params = [email, password];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.get('/api/hello', (req, res) => {
  res.json({ hello: 'world' });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

// http POST localhost:3000/api/auth/sign-up "email"="marissaljames@gmail.com" "password"="password1!"
