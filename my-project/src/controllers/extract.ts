import { parseWebsite } from '../data/parser';
import { connectToMongoDB } from '../database/DbConnect';

export async function ExtractAndShow(url: string): Promise<{ type: string; city: string; year: string; floor: string }> {
    try {
        const { type, city, year,floor } = await parseWebsite(url);
        console.log('Type:', type);
        console.log('City:', city);
        console.log('Year:', city);
        console.log('Floor:', city);

        return { type, city, year, floor }; // Return the extracted data
    } catch (error) {
        console.error('Error extracting and showing data:', error);
        throw error;
    }
}

export async function ExtractAndSave(url: string): Promise<void> {
    try {
        await connectToMongoDB();
        const { type, city, year, floor } = await parseWebsite(url);
        // Save to MongoDB
        console.log('Type:', type, 'City:', city, 'Year:', year, 'Floor:',floor);
        // Save logic here
    } catch (error) {
        console.error('Error extracting and saving data:', error);
        throw error;
    }
}
