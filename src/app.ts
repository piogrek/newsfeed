import express, { Application, Request, Response } from 'express';
import NewsFeedStatsHandler from './api/stats';

const app: Application = express();

const PORT: number = 3001;

const winston = require('winston');
const consoleTransport = new winston.transports.Console();
const myWinstonOptions = {
    transports: [consoleTransport]
}

const logger = new winston.createLogger(myWinstonOptions);
function logRequest(req: Request, res: Response, next: Function) {
    logger.info(req.url)
    next()
}
app.use(logRequest);

function logError(err: any, req: Request, res: Response, next: Function) {
    logger.error(err)
    next()
}
app.use(logError);

app.use('/', NewsFeedStatsHandler(logger));

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});