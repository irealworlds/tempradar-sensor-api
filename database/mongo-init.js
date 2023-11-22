// mongo-init.js

db = db.getSiblingDB(process.env.DB_NAME ?? 'tempradar');

// Create a user with read and write access to the 'tempradar' database
db.createUser({
    user: process.env.DB_USER ?? 'tempradar',
    pwd: process.env.DB_PASSWORD ?? 'tempradar',
    roles: [
        {
            role: 'readWrite',
            db: 'tempradar'
        }
    ]
});