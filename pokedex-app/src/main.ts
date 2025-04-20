import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';  // Can still use AppComponent or remove this entirely
import { routes } from './app/app.routes'
import { provideHttpClient } from '@angular/common/http';

// Bootstrap the application with the root component
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)),  // Provide the router configuration
    provideHttpClient()
  ]
}).catch(err => console.error(err));