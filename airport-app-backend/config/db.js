import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),

  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool;

try {

  pool = await sql.connect(config);

  console.log("✅ SQL Server Connected");

} catch (error) {

  console.log("❌ Database Connection Failed");

  console.log(error);
}

export { sql, pool };