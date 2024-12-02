import 'zone.js/node';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import bootstrap from './src/main.server';

// Function to create the Express server
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files from the browser folder
  server.use(express.static(browserDistFolder, { maxAge: '1y' }));

  // All other routes are handled by Angular Universal
  server.get('*', (req, res) => {
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => {
        console.error('Error during SSR:', err);
        res.status(500).send('An error occurred while rendering the page.');
      });
  });

  return server;
}

// Function to start the server
function run(): void {
  const port = process.env['PORT'] || 4000;

  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server is running at http://localhost:${port}`);
  });
}

// Start the server if this file is executed directly
if (require.main === module) {
  run();
}
