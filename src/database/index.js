const { Client } = require('pg');

const client = new Client({
  uhost: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'warehouse',
});

client.connect();

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
