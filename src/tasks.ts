import { ParameterizedContext } from 'koa';
import { Joi } from 'koa-joi-router';
import { Connection, ResultSetHeader } from 'mysql2/promise';

const get = {
  method: 'GET',
  path: '/taskList/:taskListId/tasks',
  validate: {
    params: {
      taskListId: Joi.number().positive().integer().required(),
    },
  },
  handler: async (ctx: ParameterizedContext<{ connection: Connection }>) => {
    const [rows] = await ctx.state.connection.execute('SELECT * FROM tasks WHERE taskListId = ?', [ctx.request.params.taskListId]);

    ctx.body = rows;
  },
};

const post = {
  method: 'POST',
  path: '/taskList/:taskListId/task',
  validate: {
    body: {
      title: Joi.string().required(),
    },
    params: {
      taskListId: Joi.number().positive().integer().required(),
    },
    type: 'json',
  },
  handler: async (ctx: ParameterizedContext<{ connection: Connection }>) => {
    const data = { taskListId: ctx.request.params.taskListId, ...ctx.request.body };
    const [{ insertId: id }] = await ctx.state.connection.execute<ResultSetHeader>(
      'INSERT INTO tasks (taskListId, title) VALUES (:taskListId, :title)',
      data,
    );

    ctx.body = { ...data, id };
  },
};

export const routes = [get, post];
