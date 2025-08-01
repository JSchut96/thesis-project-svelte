import { handler } from './build/handler.js';
import express from 'express';
import path from 'path';

const app = express();

app.use((req, res, next) => {
  console.log('--- INCOMING REQUEST ---');
  console.log('Host:', req.headers.host);
  console.log('Origin:', req.headers.origin);
  console.log('Referer:', req.headers.referer);
  console.log('X-Forwarded-Proto:', req.headers['x-forwarded-proto']);
  console.log('------------------------');
  next();
});

app.set('trust proxy', true);

app.use(express.static(path.resolve('./build')));

// Let SvelteKit handle all other routes
app.use(handler);

const port = process.env.PORT || 3000;
    app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});