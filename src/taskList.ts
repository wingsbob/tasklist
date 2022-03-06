import { ParameterizedContext } from 'koa';
import { Joi } from 'koa-joi-router';
import { Connection, ResultSetHeader } from 'mysql2/promise';

const get = {
  method: 'GET',
  path: '/taskLists',
  validate: {
  },
  handler: async (ctx: ParameterizedContext<{ connection: Connection }>) => {
    const [rows] = await ctx.state.connection.execute('SELECT * FROM taskLists');

    ctx.body = rows;
  },
};

const post = {
  method: 'POST',
  path: '/taskList',
  validate: {
    body: {
      title: Joi.string().required(),
    },
    type: 'json',
  },
  handler: async (ctx: ParameterizedContext<{ connection: Connection }>) => {
    const [{ insertId: id }] = await ctx.state.connection.execute<ResultSetHeader>(
      'INSERT INTO taskLists (title) VALUES (:title)',
      ctx.request.body,
    );

    ctx.body = { ...ctx.request.body, id }
  },
};

export const routes = [get, post];
