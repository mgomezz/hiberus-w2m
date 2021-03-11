import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { NavComponent } from './components/nav/nav.component';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';

import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerService } from './services/spinner/spinner.service';
import { HeroesService } from './services/heroes/heroes.service';

@NgModule({
  declarations: [AppComponent, NavComponent, SpinnerOverlayComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,

    //ANGULAR MATERIAL MODULES
    MatIconModule,
    MatSliderModule,
    MatSidenavModule,
    MatToolbarModule,
    MatInputModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    SpinnerService,
    HeroesService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
