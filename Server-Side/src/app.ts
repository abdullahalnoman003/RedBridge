import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config/index.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { UserRoutes } from './modules/user/user.route.js';
import { DonorRoutes } from './modules/donor/donor.route.js';
import { LocationRoutes } from './modules/location/location.route.js';

const app = express();

// ── Security Middlewares ──────────────────────────────────
app.use(helmet());

app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
    error: 'Rate limit exceeded',
  },
});

app.use(limiter);

// ── Body Parsers ──────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Health Check ──────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Blood Donation Finder API is running',
    data: {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
  });
});

// ── API Routes ────────────────────────────────────────────
app.use('/api/users', UserRoutes);
app.use('/api/donors', DonorRoutes);
app.use('/api/locations', LocationRoutes);

// ── 404 Handler ───────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: 'The requested endpoint does not exist',
  });
});

// ── Global Error Handler ──────────────────────────────────
app.use(errorMiddleware);

export default app;
