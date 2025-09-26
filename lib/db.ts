// lib/db.ts
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: '193.203.166.162',
  user: 'u798549879_barber_admin',
  password: 'barber_Admin22',
  database: 'u798549879_barber_demo',
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
