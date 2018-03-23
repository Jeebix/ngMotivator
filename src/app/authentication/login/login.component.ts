import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../authentication/services/auth.service";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	existingUser = { email: '', password: '' };

	constructor(public authService: AuthService) { }

	ngOnInit() {
	}

	// Méthode de connexion d'un utilisateur existant
	loginUser() {
		this.authService.login(this.existingUser.email, this.existingUser.password)
			.then(value => {
				console.log('login réussi :)', value);
			})
			.catch(err => {
				console.error('erreur :(', err.message);
			});
	}

	logoutUser() {
		this.authService.logout();
	}

}
