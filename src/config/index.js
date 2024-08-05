const dotenv = require ("dotenv");
dotenv.config();

const envVariables = {
    PORT : process.env.port,
    DB_URI: process.env.DB_URI
};

module.exports= envVariables;
