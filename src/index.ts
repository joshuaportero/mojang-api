import { Hono } from 'hono'

const app = new Hono()
const api = new Hono()

app.route('/api/v1', api);

const startTime = Date.now();

api.get('/', (c) => {
  const currentTime = Date.now();
  const healthInfo = {
    status: 'UP',
    uptime: (currentTime - startTime) / 1000,
    timestamp: new Date().toISOString(),
    environment: 'development',
    version: '0.0.1-DEV',
  };

  return c.json(healthInfo, 200);
});

export default app
