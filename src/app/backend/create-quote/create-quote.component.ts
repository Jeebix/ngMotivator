import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { QuotesService } from "../../services/quotes.service";
import { Quote } from "../../../quote.interface";
import { AuthService } from "../../authentication/services/auth.service";

@Component({
	selector: 'app-create-quote',
	templateUrl: './create-quote.component.html',
	styleUrls: ['./create-quote.component.css']
})
export class CreateQuoteComponent implements OnInit {

	form: FormGroup;
	
	// Evènement émis au submit du formulaire, écouté par composant parent (app.component)
	@Output()
		create = new EventEmitter();

	@Output()
		update = new EventEmitter();

	isInEditMode: boolean = false; // Flag
	verb: string = 'ajouter'; // Variable pour affichage du bouton "ajouter" ou "modifier"
	protected active: boolean = true; // Flag pour reset des styles angular material
	isAdmin: boolean = false;

	constructor(private formBuilder: FormBuilder, private quotesService: QuotesService, private authService: AuthService) { }

	ngOnInit() {
		this.form = this.formBuilder.group({
			firstname: [''],
			lastname: ['', Validators.required],
			quote: ['', Validators.required],
			key: ['']
		});

		// On s'abonne au subject pour récupérer les données du composant frère
		// Réagit quand données poussées
		// Pour modifications
		this.quotesService.subject.subscribe(data => {
			this.isInEditMode = true;
			this.verb = 'modifier';
			console.log('data', data);
			// patchValue() permet de changer ou d'assigner la valeur d'1 formControl
			// setValue() fait la même chose mais il faut assigner des valeurs à tout le formGroup
			this.form.get('firstname').patchValue((data as Quote).firstname); // data as interface
			this.form.get('lastname').patchValue((data as Quote).lastname);
			this.form.get('quote').patchValue((data as Quote).text);
			this.form.get('key').patchValue((data as Quote).key);
		});

		// On s'abonne à l'observable du service d'authentification pour tester si admin
		this.authService.user$.subscribe(user => {
			console.log('user: ', user);
			if (user && user.email === 'jbb@initiatives.fr') {
				this.isAdmin = true;
			}
			else {
				this.isAdmin = false;
			}
		});
	}

	// Méthode appelée au submit du formulaire
	saveQuote() {
		console.log('form valid : ', this.form.valid);
		if ( !this.form.valid ) {
			console.log('form NOT valid');
			return;
		}
		console.log('form is valid');
		// Si pas en update, bouton affiche 'ajouter' puis on émet notre custom event 'create'
		if ( !this.isInEditMode ) {
			this.verb = 'ajouter';
			// Méthode emit() de l'instance de l'eventEmitter envoie le formGroup
			this.create.emit(this.form);
		}
		// Et si en édition, on émet l'event 'update' vers le parent puis on repasse le bouton en 'ajouter'
		else if ( this.isInEditMode ) {
			this.update.emit(this.form);
			this.isInEditMode = !this.isInEditMode;
		}
		// On reset le formulaire
		this.form.reset();
		this.active = false;
		setTimeout(() => { this.active = true }, 0);
		this.verb = 'ajouter';
	}

	// Méthode pour annuler l'édition d'une citation
	cancelEdit() {
		this.isInEditMode = false;
		this.verb = 'ajouter';
		this.form.reset();
	}

}
