import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getCustomPaginator } from './core/configs/CustomPaginatorIntl';
import { authInterceptor } from './core/authentication/interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideToastr(),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ), provideAnimationsAsync(),
    {provide: MatPaginatorIntl, useValue: getCustomPaginator()},
  ]
};
