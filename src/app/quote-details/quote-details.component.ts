import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: 'app-quote-details',
	templateUrl: './quote-details.component.html',
	styleUrls: ['./quote-details.component.css']
})
export class QuoteDetailsComponent implements OnInit {

	quoteId;

	constructor(private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		// On récupère le paramètre dynamique définit dans les routes via l'instance de activatedRoute
		this.quoteId = this.activatedRoute.snapshot.paramMap.get('id');
	}

}