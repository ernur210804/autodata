import express from 'express';
import routes from './routes/routes';

const app = express();
const port = process.env.PORT || 3000; // Use the port specified in the environment variable or default to 3000

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/', routes); // Mount your routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
