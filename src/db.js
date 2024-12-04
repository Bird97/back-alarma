import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "database-2.czs2qsia8csr.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "51c59ef29500",
  database: "alarma",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
