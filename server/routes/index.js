const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const squel = require("squel")
const faker = require('faker')
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/quantummetrics';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

let generateUsers = () => {
  let id = 0;
  for (var i = 0; i < 1000; i++) {
    let user = {
      id: 0,
      user_email: '',
      user_first_name: '',
      user_last_name: '',
      screen_width: 0,
      screen_height: 0,
      visits: 0,
      page_response: 0,
      domain: '',
      path: ''
    }
    user.id = id
    user.user_email = faker.internet.email()
    user.user_first_name = faker.name.firstName()
    user.user_last_name = faker.name.lastName()
    user.screen_width = faker.random.number()
    user.screen_height = faker.random.number()
    user.visits = faker.random.number()
    user.page_response = faker.random.number()
    user.domain = faker.internet.domainName()
    user.path = faker.internet.url()
    id++
    pg.connect(connectionString, (err, client, done) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
      }
      // SQL Query > Insert Data
      client.query(`INSERT INTO users(user_email, user_first_name,
                  user_last_name, screen_width, screen_height, visits, page_response, domain, path) values($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [user.user_email, user.user_first_name, user.user_last_name, user.screen_width, user.screen_height, user.visits, user.page_response, user.domain, user.path]);
      // SQL Query > Select Data
      const query = client.query('SELECT * FROM users ORDER BY id ASC');
      // After all data is returned, close connection and return results
      query.on('end', () => {
        done();
      });
    });
  }
}

// generateUsers()

app.post('/sortusers', (req, res) => {
  console.log(req.body);
  res.send('filter users')
})

module.exports = router;
