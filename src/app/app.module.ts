import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationComponent } from './notification/notification.component';
import { NameCheckerComponent } from './name-checker/name-checker.component';
import { BonusRoundComponent } from './bonus-round/bonus-round.component';

@NgModule({
	declarations: [
		AppComponent,
		NotificationComponent,
		NameCheckerComponent,
		BonusRoundComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
