import express from 'express';
// import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import router from './routes/index.js';
import helmet from 'helmet';

// import notFoundHandler from './middlewares/notFoundHandler.js';
// import errorHandler from './middlewares/errorHandler.js';


const PORT = Number(env('PORT', '3000'));

export default function setupServer() {
  const app = express();

  app.use(helmet());

  // app.disable('x-powered-by');
//   const logger = pino({
//     transport: {
//       target: 'pino-pretty',
//     },
//   });

  const corsOptions = {
    origin: 'https://mercury-paws.github.io',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
  };

  app.use(cors(corsOptions));


//   app.use(logger);
  app.use(express.json());

  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Server is running" });
  });
  
  app.use(router);

//   app.use(notFoundHandler);
//   app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}