import { handler } from './build/handler.js';
import express from 'express';
import path from 'path';

const app = express();

// Serve static files from the build directory
app.use(express.static(path.resolve('./build')));

// Let SvelteKit handle all other routes
app.use(handler);

const port = process.env.PORT || 3000;
    app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});