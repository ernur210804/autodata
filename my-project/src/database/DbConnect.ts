import { MongoClient } from 'mongodb';

const connectionString = 'mongodb://localhost:27017/parser';

export async function connectToMongoDB() {
  try {
    const client = await MongoClient.connect(connectionString, {
      // @ts-ignore
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    const db = client.db(); 
    return { client, db }; 
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}

export async function saveDataToMongoDB(data: any) {
  const { client, db } = await connectToMongoDB();
  try {
    const collection = db.collection('savedData');
    const result = await collection.insertOne(data);
    console.log('Data inserted:', result.insertedId);
  } catch (error) {
    console.error('Error saving data to MongoDB:', error);
    throw new Error('Failed to save data to MongoDB');
  } finally {
    await client.close();
  }
}
