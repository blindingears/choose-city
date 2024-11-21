import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { HttpClientModule } from '@angular/common/http';

export const config: ApplicationConfig = {
  providers: [
    provideServerRendering(), // Für SSR notwendig
    importProvidersFrom(HttpClientModule), // HttpClientModule bereitstellen
  ],
};
