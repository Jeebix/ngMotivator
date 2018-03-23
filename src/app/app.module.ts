import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Firebase
import { AngularFireModule, FirebaseAppConfig } from "angularfire2"; // module pour AngularFire2
import { AngularFireDatabaseModule } from "angularfire2/database"; // module pour angularfire database
import { AngularFireAuthModule } from "angularfire2/auth"; // module pour l'authentification

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

// Material design
import { MaterialModule } from "./material.module";

// Services
import { QuotesService } from "./services/quotes.service";
import { AuthService } from "./authentication/services/auth.service";

// Custom components
import { AppComponent } from './app.component';
import { QuotesComponent } from './quotes/quotes.component';
import { CreateQuoteComponent } from './backend/create-quote/create-quote.component';
import { QuoteDetailsComponent } from './quote-details/quote-details.component';
import { BackendHomeComponent } from './backend/backend-home/backend-home.component';
import { BackendQuotesComponent } from './backend/backend-quotes/backend-quotes.component';
import { RegisterUserComponent } from './authentication/register-user/register-user.component';
import { LoginComponent } from './authentication/login/login.component';

// voir pour config sur site de Firebase (https://console.firebase.google.com/)
const CONFIG: FirebaseAppConfig = {
	apiKey: "AIzaSyB_ncuFosxFHOfgCemV0tHtSYJNyuzLcF0",
	authDomain: "motivator-91cf6.firebaseapp.com",
	databaseURL: "https://motivator-91cf6.firebaseio.com",
	projectId: "motivator-91cf6",
	storageBucket: "motivator-91cf6.appspot.com",
	messagingSenderId: "3031202403"
};

const ROUTES: Routes = [
	{ path: '', pathMatch: 'full', component: QuotesComponent },
	{ path: 'quote/:id', component: QuoteDetailsComponent },
	{ path: 'admin', component: BackendHomeComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		QuotesComponent,
		CreateQuoteComponent,
		QuoteDetailsComponent,
		BackendHomeComponent,
		BackendQuotesComponent,
		RegisterUserComponent,
		LoginComponent
	],
	imports: [
		BrowserModule,
		AngularFireModule.initializeApp(CONFIG),
		// module avec 1 méthode d'initialisation avec en paramètre objet de configuration
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		BrowserAnimationsModule,
		RouterModule.forRoot(ROUTES)
	],
	providers: [ QuotesService, AuthService ],
	bootstrap: [AppComponent]
})
export class AppModule { }
