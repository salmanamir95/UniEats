import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';  // HTTP client with fetch backend
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),  // Enables event coalescing for zone change detection
    provideRouter(routes),  // Provides routing configuration
    provideClientHydration(),  // Hydrates the client application
    provideHttpClient(withFetch()),  // Configures HttpClient with the fetch API
    // Add any additional providers you might need here
  ]
};
