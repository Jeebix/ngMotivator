import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { QuotesService } from "../services/quotes.service";

@Component({
	selector: 'app-quotes',
	templateUrl: './quotes.component.html',
	styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

	quotes$; // Observable

	constructor(private quotesService: QuotesService, private router: Router) { }

	ngOnInit() {
		// On appelle la méthode getQuotes() du service
		this.quotes$ = this.quotesService.getQuotes();
	}

	showQuoteDetails(quote) {
		console.log('quote', quote);
		// Instance de Router avec méthode navigate() prends tableau en paramètre
		// permet de naviguer vers url spécifiée dans le tableau
		this.router.navigate(['/quote', quote.key]);
	}

}
