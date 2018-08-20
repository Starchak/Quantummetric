const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const squel = require("squel")
const faker = require('faker')
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/quantummetrics';

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sortusers', (req, res, next) => {
  let listStr = ''
  let newSearchField = ''
  let results = []
  let filterQuery = squel.select().from("users")
  let filters = JSON.parse(req.body.data)
  console.log(filters);
  filters.forEach(filter=>{
    switch (filter.option) {
      case 'Range':
        filterQuery = filterQuery.clone().where(filter.field + " BETWEEN " + filter.from + " and " + filter.to)
        break;
      case 'Less than or equal':
        filterQuery = filterQuery.clone().where(filter.field + " <= " + filter.searchText)
        break;
      case 'Equals':
        if (filter.field === 'screen_width' || filter.field === 'screen_height' || filter.field === 'visits' || filter.field === 'page_response') {
          filterQuery = filterQuery.clone().where(filter.field + " = " + filter.searchText)
        } else {
          filterQuery = filterQuery.clone().where(filter.field + " = '" + filter.searchText + "'")
        }
        break;
      case 'Does not equals':
        if (filter.field === 'screen_width' || filter.field === 'screen_height' || filter.field === 'visits' || filter.field === 'page_response') {
          filterQuery = filterQuery.clone().where(filter.field + " <> " + filter.searchText)
        } else {
          filterQuery = filterQuery.clone().where(filter.field + " <> '" + filter.searchText + "'")
        }
        break;
      case 'Greater than or equals':
        filterQuery = filterQuery.clone().where(filter.field + " >= " + filter.searchText)
        break;
      case 'Starts with':
        filterQuery = filterQuery.clone().where(filter.field + " LIKE '" + filter.searchText + "%'")
        break;
      case 'Does not starts with':
        filterQuery = filterQuery.clone().where(filter.field + " NOT LIKE '" + filter.searchText + "%'")
        break;
      case 'Contains':
        filterQuery = filterQuery.clone().where(filter.field + " LIKE '%" + filter.searchText + "%'")
        break;
      case 'Does not contains':
        filterQuery = filterQuery.clone().where(filter.field + " NOT LIKE '%" + filter.searchText + "%'")
        break;
      case 'In list':
        listStr = filter.searchText.split(" ")
        newSearchField = "("
        listStr.forEach(el=>{
          newSearchField += "'" + el + "',"
        })
        newSearchField = newSearchField.substring(0, newSearchField.length - 1);
        newSearchField += ")"
        filterQuery = filterQuery.clone().where(filter.field + " IN " + newSearchField)
        break;
      case 'Not in list':
        listStr = filter.searchText.split(" ")
        newSearchField = "("
        listStr.forEach(el=>{
          newSearchField += "'" + el + "',"
        })
        newSearchField = newSearchField.substring(0, newSearchField.length - 1);
        newSearchField += ")"
        filterQuery = filterQuery.clone().where(filter.field + " NOT IN " + newSearchField)
        break;
      default:

    }
  })
  console.log('' + filterQuery);
  pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query("" + filterQuery + " ORDER BY id ASC");
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      console.log(results);
      return res.json(results);
    });
  });
})

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

module.exports = router;
