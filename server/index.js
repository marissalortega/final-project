require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);
app.use(express.json());

app.post('/api/auth/register', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(400, 'email and password are required fields');
  } else if (password.length < 8) {
    throw new ClientError(400, 'password must be at least 8 characters.');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("email", "password")
        values ($1, $2)
        returning *
      `;
      const params = [email, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
      "password",
      "email"
    from "users"
    where "email" = $1
  `;
  const params = [email];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      return argon2
        .verify(user.password, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = {
            userId: user.userId,
            email: user.email
          };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.post('/api/add-client', (req, res, next) => {
  const { userId } = req.user;
  const { firstName, lastName, email, phoneNumber, streetAddress, city, state, zipCode, birthday } = req.body;
  if (!firstName || !lastName || !email || !phoneNumber || !streetAddress || !city || !state || !zipCode || !birthday) {
    throw new ClientError(400, 'First Name, Last Name, Email, Phone Number, Street Address, City, State, Zip Code, and Birthday are required fields.');
  }
  const sql = `
    insert into "clients" ("userId", "firstName", "lastName", "email", "phoneNumber", "streetAddress", "city", "state", "zipCode", "birthday")
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        returning *
  `;
  const params = [userId, firstName, lastName, email, phoneNumber, streetAddress, city, state, zipCode, birthday];
  db.query(sql, params)
    .then(result => {
      const [client] = result.rows;
      res.status(201).json(client);
    })
    .catch(err => next(err));
});

app.get('/api/add-client', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select *
      from "clients"
      where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

// http POST localhost:3000/api/auth/sign-in "email"="eric@gmail.com" "password"="password1!"

// http -v POST localhost:3000/api/add-client X-Access-Token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImVtYWlsIjoiZXJpY0BnbWFpbC5jb20iLCJpYXQiOjE2NjczNjQxNDZ9.K3eIFcZx6HnRJdCWyY_aTGuU3MoesXchCaqYvtz5Ya4 "firstName"="Sara" "lastName"="James" "email"="sara@gmail.com" "phoneNumber"="5555550000" "streetAddress"="123 Candy Cane Lane" "city"="Los Angeles" "state"="CA" "zipCode"="90210" "birthday"="1994/03/11"

// http -v GET localhost:3000/api/add-client X-Access-Token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImVtYWlsIjoiZXJpY0BnbWFpbC5jb20iLCJpYXQiOjE2Njc4ODEzNDV9.uh2lyGORT9Iczeni6gRtDfVqIiLYs-z3-_ToV-Chcv8
