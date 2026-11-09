import mongoose from 'mongoose';

export async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ MongoDB connection established successfully');
  } catch {
    console.error(
      'Failed to connect to MongoDB. Check MONGO_URL and database access.',
    );
    process.exit(1);
  }
}
