import express from 'express';
import { ExtractAndShow,ExtractAndSave } from '../controllers/extract';
import { saveDataToMongoDB } from '../database/DbConnect';
import { parseWebsite } from '../data/parser';

const router = express.Router();

router.post('/extract-and-show', async (req, res) => {
  try {
    const { url } = req.body;

    const data = await ExtractAndShow(url);

    res.json(data);
  } catch (error) {
    console.error('Error extracting and showing data:', error);
    res.status(500).json({ error: 'An error occurred while extracting and showing data' });
  }
});
router.post('/save-data', async (req, res) => {
  try {
    const { url } = req.body;

    const { type, city, year,floor } = await parseWebsite(url);

    await saveDataToMongoDB({ type, city, year, floor });

    res.json({ message: 'Data saved to MongoDB' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'An error occurred while saving data to MongoDB' });
  }
});

export default router;
