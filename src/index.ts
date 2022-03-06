import { createConnection } from 'mysql2/promise';
import Koa from 'koa';
import { routes } from './router';

const main = async () => {
  const connection = await createConnection('mysql://tasklist:secure-password@alex-drawer/tasklist');

  connection.config.namedPlaceholders = true;
  const app = new Koa();

  app.use<{ connection: typeof connection }>((ctx, next) => {
    ctx.state.connection = connection;
    return next();
  });
  app.use(routes.middleware());

  app.listen(3000);
};

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
