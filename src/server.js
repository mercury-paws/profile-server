import express from 'express';
// import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import router from './routes/index.js';

// import notFoundHandler from './middlewares/notFoundHandler.js';
// import errorHandler from './middlewares/errorHandler.js';


const PORT = Number(env('PORT', '3000'));

export default function setupServer() {
  const app = express();

//   const logger = pino({
//     transport: {
//       target: 'pino-pretty',
//     },
//   });

  // const corsOptions = {
  //   origin:
  //     process.env.NODE_ENV === 'production'
  //       ? 'https://water-app-f.vercel.app/'
  //       : 'http://localhost:5173',
  //   credentials: true,
  // };

  const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // amended put to patch
    // allowedHeaders: ['Content-Type', 'Authorization'], // added headers
  };

  app.use(cors(corsOptions));


//   app.use(logger);
  app.use(express.json());

  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });
  app.use(router);

//   app.use(notFoundHandler);
//   app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}