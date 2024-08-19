import http from 'http';
import express from 'express';
import './config/logging';

import { corsHandler } from './middlewares/corsHandler.js';
import { loggingHandler } from './middlewares/loggingHandler.js';
import { routeNotFound } from './middlewares/routeNotFound.js';
import { server } from './config/config.js';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes.js';
import slotMachineRoutes from './routes/slotMachineRoutes.js';
// import { errorHandler } from './middlewares/errorHandler';


export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
    logging.log('----------------------------------------');
    logging.log('Initializing API');
    logging.log('----------------------------------------');
    application.use(helmet());
    application.use(express.json());
    application.use(express.urlencoded({ extended: true }));

    logging.log('----------------------------------------');
    logging.log('Logging & Configuration');
    logging.log('----------------------------------------');
    application.use(loggingHandler);
    application.use(corsHandler);
    // application.use(errorHandler);


    logging.log('----------------------------------------');
    logging.log('Define Controller Routing');
    logging.log('----------------------------------------');
    application.get('/api/healthcheck', (req, res, next) => {
        next();
        return res.status(200).json({ hello: 'world!' });
    });

    application.use('/user', userRoutes);
    application.use('/slot-machine', slotMachineRoutes);

    logging.log('----------------------------------------');
    logging.log('Define Routing Error');
    logging.log('----------------------------------------');
    application.use(routeNotFound);

    logging.log('----------------------------------------');
    logging.log('Starting Server');
    logging.log('----------------------------------------');
    httpServer = http.createServer(application);
    httpServer.listen(server.SERVER_PORT, () => {
        logging.log('----------------------------------------');
        logging.log(`Server started on ${server.SERVER_HOSTNAME}:${server.SERVER_PORT}`);
        logging.log('----------------------------------------');
    });
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();