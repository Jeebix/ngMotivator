import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Subject } from "rxjs/Subject"; // émet et écoute des infos

@Injectable()
export class QuotesService {

	subject = new Subject();
	
	// Injection de dépendance pour créer instance d'AngularFireDatabase
	constructor(private afDb: AngularFireDatabase) { }

	getQuotes() {
		// Méthode 'list' permet d'accéder aux noeuds 'quotes' de la db
		// valueChanges() permet de récupérer un observable
		// On retourne l'observable
		console.log('dans getQuotes');
		// return this.afDb.list('quotes').valueChanges();

		// snapshotChanges() retourne un obervable d'AFDb
		// puis on map pour que sur chacunes des quotes, on récupère le quote et on le mappe en objet avec les infos voulues
		return this.afDb.list('quotes').snapshotChanges().map(
			quotes => quotes.map(quote => ({ key: quote.key, ...quote.payload.val() })));
	}

	createQuote(quote) {
		// Méthode list() pointe vers noeud 'quotes' et méthode push() en rajoute une
		// list() et push() méthodes natives d'AngularFireDatabase
		return this.afDb.list('quotes').push(quote);
		// On retourne la quote pour voir les metadatas
	}

	deleteQuoteById(id: string) {
		// Méthode remove() de afDb pour supprimer
		return this.afDb.list('quotes').remove(id);
	}

	editQuote(quote) {
		// Le subject permet de pousser les données de la quote à celui qui s'abonne
		// Ici, le formulaire qui affiche les infos à éditer
		this.subject.next(quote);
	}

	updateQuote(quote) {
		// Utilisation de la méthode d'AF object() pour cibler précisemment un élément
		// Ici, on va vers le noeud 'quotes' puis via le template string on dirigera vers un id précis
		// update() méthode native d'AF
		return this.afDb.object(`quotes/${quote.key}`).update(quote);
	}
}
