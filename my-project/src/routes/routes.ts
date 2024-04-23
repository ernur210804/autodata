// In your routes file (e.g., routes.ts)
import express from 'express';
import { ExtractAndShow,ExtractAndSave } from '../controllers/extract';
import { saveDataToMongoDB } from '../database/DbConnect';
import { parseWebsite } from '../data/parser';

const router = express.Router();

// Define the endpoint for handling POST requests to /extract-and-show
router.post('/extract-and-show', async (req, res) => {
  try {
    // Extract the URL from the request body
    const { url } = req.body;

    // Call the ExtractAndShow function with the provided URL
    const data = await ExtractAndShow(url);

    // Send the extracted data as the response
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error('Error extracting and showing data:', error);
    res.status(500).json({ error: 'An error occurred while extracting and showing data' });
  }
});
router.post('/save-data', async (req, res) => {
  try {
    const { url } = req.body; // Assuming the URL is sent in the request body

    // Parse the website to extract data
    const { type, city, year,floor } = await parseWebsite(url);

    // Save the extracted data to MongoDB
    await saveDataToMongoDB({ type, city, year, floor });

    res.json({ message: 'Data saved to MongoDB' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'An error occurred while saving data to MongoDB' });
  }
});

export default router;
