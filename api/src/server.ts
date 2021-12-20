import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import { HttpStatus } from './utils/httpUtils';
import guessRoutes from './routes/guessRoutes';

const router: Express = express();

router.use(morgan('dev'));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// Cors
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'origin, X-Requested-With,Content-Type,Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET POST');
    return res.status(HttpStatus.OK).json({});
  }
  next();
});

// Api routes
router.use('/api/', guessRoutes);

// Not found route
router.use((req, res) => {
  return res.status(HttpStatus.NOT_FOUND).json({
    message: 'Not found'
  });
});

// TODO: Test with supertest
// TODO: Use dotenv for env variables
const server = http.createServer(router);
const PORT: any = process.env.PORT ?? 3000;
server.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
