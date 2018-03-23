import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";

@Component({
	selector: 'app-register-user',
	templateUrl: './register-user.component.html',
	styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

	newUser = { email: '', password: '' };

	constructor(public authService: AuthService) { }

	ngOnInit() {
	}

	// Méthode d'enregistrement nouvel utilisateur
	registerUser() {
		// console.log(this.newUser.email, this.newUser.password);
		this.authService.register(this.newUser.email, this.newUser.password)
			// then() car promesse retournée
			.then(createdUser => {
				console.log('createdUser', createdUser);
				// Reset du form
				this.newUser.email = "";
				this.newUser.password = "";
				// Envoi email de vérification
				this.authService.sendEmailVerification();
			})
			.catch(error => console.error(error.message));
	}

}
