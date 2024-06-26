import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import helmet from 'helmet';
import {router} from './routes';
import * as morgan from 'morgan';

// declare express app
const app = express();

// add security for HTTP headers
app.use(helmet());

// add morgan logs
app.use(morgan('combined'));

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({extended: true}));

// add gzip compression
app.use(compression());

// enable cors
app.use(cors({methods: ['GET', 'POST', 'PUT']}));
app.options('*', cors());

app.use('/', router);

export {app};
