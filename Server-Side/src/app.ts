import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { randomUUID } from 'node:crypto';
import { RequestHandler } from 'express';
import { rateLimit } from 'express-rate-limit';
import { config } from './config/index.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { ERRORS } from './utils/errors.constants.js';
import { UserRoutes } from './modules/user/user.route.js';
import { DonorRoutes } from './modules/donor/donor.route.js';
import { LocationRoutes } from './modules/location/location.route.js';

const app = express();

const resolveHelmet = (): RequestHandler => {
  const helmetModule = helmet as unknown as { default?: () => RequestHandler };
  const helmetFactory: (() => RequestHandler) | undefined =
    typeof helmet === 'function'
      ? (helmet as unknown as () => RequestHandler)
      : helmetModule.default;

  if (helmetFactory) {
    return helmetFactory();
  }

  throw new Error('Helmet middleware initialization failed');
};

// ── Security Middlewares ──────────────────────────────────
app.use(resolveHelmet());

app.use((req, res, next) => {
  const requestId = randomUUID();
  const start = Date.now();

  res.setHeader('x-request-id', requestId);

  res.on('finish', () => {
    const durationMs = Date.now() - start;
    const method = req.method;
    const path = req.originalUrl;
    const status = res.statusCode;

    console.info(
      `[request] id=${requestId} method=${method} path=${path} status=${status} durationMs=${durationMs}`
    );
  });

  next();
});

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
  max: 10000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: ERRORS.RATE_LIMIT_EXCEEDED.msg,
    error: ERRORS.RATE_LIMIT_EXCEEDED.msg,
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
  res.status(ERRORS.ROUTE_NOT_FOUND.code).json({
    success: false,
    message: ERRORS.ROUTE_NOT_FOUND.msg,
    error: 'The requested endpoint does not exist',
  });
});

// ── Global Error Handler ──────────────────────────────────
app.use(errorMiddleware);

export default app;
