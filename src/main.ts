import * as dotenv from 'dotenv';

import createServer from './server';
import logger from './utils/logger';
// import { registerSchedulers } from './utils/scheduler';
import mainRouter from './routers/v1/main.router';
import { connect } from './database/db';
import keycloack from './utils/keycloack';

const port = process.env.PORT || 3015;
const cors = require('cors');

(async () => {
  try {
    const app = createServer();
    dotenv.config();
    app.listen(port, () => {
      logger.info(
        `Cragheads Profile API Server started! Listening on port: ${port}`,
      );
    });

    // infrastructure boot up
    await connect();

    app.use(keycloack.middleware());
    app.use('/v1', mainRouter);
    app.use(cors);

    // registerSchedulers();
  } catch (error) {
    logger.error(
      `Error starting server: ${error instanceof Error ? error.message : '-'}`,
    );
  }
})();
