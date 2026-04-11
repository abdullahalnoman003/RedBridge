import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';

let dbConnected = false;

export default async function handler(req: any, res: any) {
  try {
    // Connect to database only once
    if (!dbConnected) {
      await connectDB();
      dbConnected = true;
    }

    // Handle the request with Express app
    app(req, res);
  } catch (error) {
    console.error('❌ Serverless handler error:', error);
    
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Server initialization failed',
        error: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }
}