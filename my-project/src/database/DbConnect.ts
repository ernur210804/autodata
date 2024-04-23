import { MongoClient } from 'mongodb';

const connectionString = 'mongodb://localhost:27017/parser';

export async function connectToMongoDB() {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(connectionString, {
      // @ts-ignore
      useNewUrlParser: true, // Use the new URL parser
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    const db = client.db(); // Get the database instance
    return { client, db }; // Return both client and database instance
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}

export async function saveDataToMongoDB(data: any) {
  const { client, db } = await connectToMongoDB(); // Destructure client and db from the returned object
  try {
    const collection = db.collection('savedData');
    const result = await collection.insertOne(data);
    console.log('Data inserted:', result.insertedId);
  } catch (error) {
    console.error('Error saving data to MongoDB:', error);
    throw new Error('Failed to save data to MongoDB');
  } finally {
    await client.close(); // Close the client connection in the finally block
  }
}
