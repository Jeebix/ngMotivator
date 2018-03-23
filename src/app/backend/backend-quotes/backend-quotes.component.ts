import { Component, OnInit } from '@angular/core';
import { QuotesService } from "../../services/quotes.service";
import { AuthService } from "../../authentication/services/auth.service";

@Component({
	selector: 'app-backend-quotes',
	templateUrl: './backend-quotes.component.html',
	styleUrls: ['./backend-quotes.component.css']
})
export class BackendQuotesComponent implements OnInit {

	quotes$;
	isAdmin: boolean = false;

	constructor(private quotesService: QuotesService, private authService: AuthService) { }

	ngOnInit() {
		// On appelle la méthode getQuotes() du service
		this.quotes$ = this.quotesService.getQuotes();

		// Puis on s'abonne à l'observable du service d'authentification pour tester si admin
		this.authService.user$.subscribe(user => {
			console.log('user: ', user);
			if ( user && user.email === 'jbb@initiatives.fr' ) {
				this.isAdmin = true;
			}
			else {
				this.isAdmin = false;
			}
		});
	}

	deleteQuote(quote) {
		console.log(quote);
		this.quotesService.deleteQuoteById(quote.key);
	}

	showQuoteDetails(quote) {
		// console.log('quote', quote);
		// // Instance de Router avec méthode navigate() prends tableau en paramètre
		// // permet de naviguer vers url spécifiée dans le tableau
		// this.router.navigate(['/quote', quote.key]);
	}

	toggleToEditMode(quote) {
		this.quotesService.editQuote(quote);
	}

}
