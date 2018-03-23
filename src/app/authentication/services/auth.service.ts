import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import * as firebase from "firebase/app"; // pour typage de l'observable

@Injectable()
export class AuthService {

	user$: Observable<firebase.User>; // Observablke pour voir si utilisateur

	constructor(private angularfireAuth: AngularFireAuth) {
		this.user$ = angularfireAuth.authState;
		// authState observable qui donne l'état de l'utilisateur
	}

	register(email: string, password: string) {
		// méthode 'auth' et 'createUserWithEmailAndPassword(email, password)' natives d'AngularfireAuth
		return this.angularfireAuth.auth.createUserWithEmailAndPassword(email, password);
		// 'return' car promesse, donc composant qui consomme le service peut utiliser then, catch 
	}

	login(email: string, password: string) {
		return this.angularfireAuth.auth.signInWithEmailAndPassword(email, password);
	}

	logout() {
		this.angularfireAuth.auth.signOut();
	}

	sendEmailVerification() {
		// On récupère l'utilisateur courant via méthode auth() de firebase
		const user = firebase.auth().currentUser;
		// Si 1 utilisateur
		if ( user ) {
			user.sendEmailVerification()
				.then(() => {
				console.log('email envoyé');
			})
				.catch((error) => {
				console.error('error sending email', error);
			});
		}
		// On pourrait restreindre l'accès en testant la propriété 'emailVerified' si true ou false
	}

}
