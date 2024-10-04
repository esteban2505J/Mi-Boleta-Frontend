import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNgxStripe } from 'ngx-stripe';
import { HttpClient, provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNgxStripe('pk_test_51Q5dZNFGVkZEhLlAtpv5ZpuC6u69Q2z6wSuNnZwFiPWmrgYD7Z7nQToPMzHdKvcEc9465rCOEi6s5LIRmzuND4o300r6xkKcCQ'),
    provideHttpClient()
  ]
};
