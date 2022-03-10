import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ICONS_PROVIDER } from './core/icon-register.service';
import { THEME_PROVIDER } from './core/theme-switcher.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    ICONS_PROVIDER,
    THEME_PROVIDER,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
