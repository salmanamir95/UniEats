import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http'; // HTTP client with fetch backend
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules) // Preloading strategy for lazy-loaded modules
    ),
    provideZoneChangeDetection({ eventCoalescing: true }), // Optimized change detection
    provideClientHydration(), // Hydrates the client application
    provideHttpClient(withFetch()), // Configures HttpClient with the fetch API
    // Add any additional providers you might need here
  ]
};
