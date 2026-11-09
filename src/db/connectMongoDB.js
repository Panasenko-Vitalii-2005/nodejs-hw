import { unescape } from 'node:querystring';
import mongoose from 'mongoose';

export async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ MongoDB connection established successfully');
  } catch (err) {
    const uri = process.env.MONGO_URL;
    const password = uri?.match(/^[^:]+:\/\/[^:@/?#]*:([^/?#]+)@/)?.[1];
    let details =
      err instanceof Error ? `${err.name}: ${err.message}` : 'Unknown error';

    for (const secret of [uri, password, password && unescape(password)]) {
      if (secret) {
        details = details.replaceAll(secret, '[redacted]');
      }
    }

    console.error(
      'Failed to connect to MongoDB. Check MONGO_URL and database access.',
      details,
    );
    process.exit(1);
  }
}
