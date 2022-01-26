// build and export your unconnected client here
const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || 'http://localhost:5433/fitness-dev';

const client = new Client({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = client;
