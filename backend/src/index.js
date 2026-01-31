import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './db/index.js';

const port = process.env.PORT || 5000

dotenv.config()

connectDB()
.then(( ) => {
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
})
.catch((error) => {
    console.error(`Failed to connect to the database: ${error.message}`);
    process.exit(1);
});