import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import helmet from 'helmet';

// declare express app
const app = express();

// add security for HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// add gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

export { app };
