import pg from 'pg';

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Rules',
    password: 'vnrvjiet',
    port: 5432,
});

const createDatabase = async () => {
    const client = new pg.Client({
        user: 'postgres',
        host: 'localhost',
        database: 'Rules',
        password: 'vnrvjiet',
        port: 5432,
    });

    try {
        await client.connect();
        await client.query('CREATE DATABASE Rules');
        console.log('Database "Rules" created successfully.');
    } catch (error) {
        if (error.code !== '42P04') { // Ignore if the database already exists
            console.error('Error creating database:', error);
        } else {
            console.log('Database "Rules" already exists.');
        }
    } finally {
        await client.end();
    }
};

const createRulesTable = async () => {
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS Engine (
                id SERIAL PRIMARY KEY,
                ruleName VARCHAR(255) UNIQUE NOT NULL,
                ruleAST JSON NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await pool.query(createTableQuery);
        console.log('Table "Engine" created successfully.');
    } catch (error) {
        console.error('Error creating table:', error);
    }
};

const initializeDatabase = async () => {
    await createDatabase();
    await createRulesTable();
};

// Export the pool for reuse in other modules
export { pool, initializeDatabase };
