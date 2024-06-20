#!/bin/bash

# Wait for PostgreSQL to start
echo "Waiting for PostgreSQL to start..."
while ! pg_isready -h $DEV_DB_HOST -p $DEV_DB_PORT -U $DEV_DB_USER; do
    sleep 5
done

echo "PostgreSQL started."

# Create the database if it does not exist
echo "Creating database if not exists..."
PGPASSWORD=$DEV_DB_PASS psql -h $DEV_DB_HOST -U $DEV_DB_USER -p $DEV_DB_PORT -d postgres -c "SELECT 1 FROM pg_database WHERE datname='$DEV_DB_NAME' LIMIT 1;" | grep -q 1 || PGPASSWORD=$DEV_DB_PASS psql -h $DEV_DB_HOST -U $DEV_DB_USER -p $DEV_DB_PORT -d postgres -c "CREATE DATABASE \"$DEV_DB_NAME\";"

echo "Running migrations..."
npx sequelize-cli db:migrate

echo "Starting application..."
node server.js
