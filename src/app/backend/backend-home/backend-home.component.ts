import { Component, OnInit } from '@angular/core';
import { QuotesService } from "../../services/quotes.service";

@Component({
  selector: 'app-backend-home',
  templateUrl: './backend-home.component.html',
  styleUrls: ['./backend-home.component.css']
})
export class BackendHomeComponent implements OnInit {

	constructor(private quotesService: QuotesService) { }

	ngOnInit() {
	}

	onQuoteCreated(quote) {
		console.log('quote retrieved', quote);
		// On fournit un objet à createQuote() car quote = formGroup
		// quote.value = valeur formulaire
		let addedQuote = this.quotesService.createQuote({
			firstname: quote.value.firstname,
			lastname: quote.value.lastname,
			text: quote.value.quote
		});
		// Pour voir ce qui est retourné par AFDb
		console.log('addedQuote ', addedQuote);
	}

	onQuoteUpdated(quote) {
		console.log('quote depuis la méthode onQuoteUpdated() du parent backend-home.component', quote);
		this.quotesService.updateQuote({ firstname: quote.value.firstname,
										 lastname: quote.value.lastname,
										 text: quote.value.quote,
										 key: quote.value.key });
	}
}
