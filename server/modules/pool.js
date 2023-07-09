const pg = require("pg");
const url = require("url");

let config = {};

if (proces.env.URL) {
  const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
  const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

  const sql = postgres(URL, { ssl: "require" });

  async function getPgVersion() {
    const result = await sql`select version()`;
    console.log(result);
  }

  getPgVersion();
}

if (process.env.DATABASE_URL) {
  // Heroku gives a url, not a connection object
  // https://github.com/brianc/node-pg-pool
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(":");

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: process.env.DATABASE_NAME || params.pathname.split("/")[1],
    ssl: { rejectUnauthorized: false },
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
} else if (process.env.HEROKU_POSTGRESQL_GRAY_URL) {
  const params = url.parse(process.env.HEROKU_POSTGRESQL_GRAY_URL);
  const auth = params.auth.split(":");
  const host = params.host.split("@");

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: process.env.DATABASE_NAME || params.pathname.split("/")[1],
    ssl: { rejectUnauthorized: false },
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
} else {
  config = {
    host: "localhost", // Server hosting the postgres database
    port: 5432, // env var: PGPORT
    database: "prime_app", // CHANGE THIS LINE! env var: PGDATABASE, this is likely the one thing you need to change to get up and running
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
}

// this creates the pool that will be shared by all other modules
const pool = new pg.Pool(config);

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on("error", (err) => {
  console.log("Unexpected error on idle client", err);
  process.exit(-1);
});

module.exports = pool;
