import * as express from 'express';
import * as logger from 'morgan';
import synonymsRouter from './routes/synonyms.route';

export const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/synonyms', synonymsRouter);
