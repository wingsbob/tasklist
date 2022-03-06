import router from 'koa-joi-router';

import { routes as taskRoutes } from './tasks';
import { routes as taskListRoutes } from './taskList';

export const routes = router();

routes.route([...taskRoutes, ...taskListRoutes]);
