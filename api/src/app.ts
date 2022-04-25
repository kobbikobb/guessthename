import express, { Express } from 'express';
import morgan from 'morgan';
import { HttpStatus } from './utils/httpUtils';
import guessRoutes from './routes/guessRoutes';
import cors from 'cors';

const app: Express = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.options('*', cors);

// Cors
app.use((req, res, next) => {
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
app.use('/', guessRoutes);

// Not found route
app.use((req, res) => {
  return res.status(HttpStatus.NOT_FOUND).json({
    message: 'Not found'
  });
});

export default app;
