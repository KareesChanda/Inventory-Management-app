let config = {
    development: {
        jwt_secret: 'secret',
        jwt_confirm_email:'secret',
        jwt_password_reset:'secret',
        //MySQL database info
        database: {
            host: "127.0.0.1",
            port: 5432,
            db_name: "pos_test",
            username: "emen",
            password: "Oseriemen20",
            dialect: "postgresql",
            pool: {
                max: 100,
                min: 1,
                acquire: 20000,
                idle: 20000,
                evictionRunIntervalMillis: 5,
                softIdleTimeoutMillis: 5
            }
        },
        server: {
            host: "127.0.0.1",
            port: 3001
        }
    },
    production: {
        jwt_secret: 'random_secret',
        jwt_confirm_email:'confirm_email',
        jwt_password_reset:'reset_your_password',
        database: {
            host: process.env.DB_HOST,
            port: 5432,
            db_name: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            dialect: "postgresql"
        },
        server: {
            host: "127.0.0.1",
            port: process.env.PORT
        }
    }
};
module.exports = config;