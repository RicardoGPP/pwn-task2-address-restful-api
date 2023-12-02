module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './db/db.sqlite3'
        },
        migrations: {
            directory: './db/migrations'
        },
        seeds: {
            directory: './db/seeds'
        }
    },
    production: {
        client: 'mysql',
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        },
        migrations: {
            directory: './db/migrations'
        },
        seeds: {
            directory: './db/seeds'
        }
    }
};