const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/quantummetrics';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  `CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    user_email VARCHAR(40) not null,
    user_first_name VARCHAR(40) not null,
    user_last_name VARCHAR(40),
    screen_width NUMERIC not null,
    screen_height NUMERIC not null,
    visits NUMERIC not null,
    page_response NUMERIC not null,
    domain VARCHAR(40) not null,
    path VARCHAR(40) not null
  )`);
query.on('end', () => { client.end(); });
