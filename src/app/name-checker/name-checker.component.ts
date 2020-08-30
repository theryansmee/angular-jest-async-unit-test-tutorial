import { Component } from '@angular/core';


@Component({
	selector: 'app-name-checker',
	templateUrl: './name-checker.component.html',
	styleUrls: ['./name-checker.component.scss']
})
export class NameCheckerComponent {


	public welcomeMessage: string;


	constructor () { }


	public returnFullNamePromise ( name: string ): Promise<string> {
		return new Promise(
			( resolve, reject ) => {
				if ( name === 'Ryan' ) {
					resolve( 'Ryan Smee' );
				}
				else {
					reject( '👎' );
				}
			}
		);
	}

	public setWelcomeMessage ( firstName: string ): void {
		this.returnFullNamePromise( firstName )
			.then(
				( fullName: string ) => this.welcomeMessage = `Welcome ${ fullName }!`
			)
			.catch(
				( error: string ) => this.handleError()
			);
	}

	async returnFullNameAsyncAwaitPromise ( name: string ) {
		const promise = new Promise(
			( resolve, reject ) => {
				if ( name === 'Ryan' ) {
					resolve( 'Ryan Smee' );
				}
				else {
					reject( '👎' );
				}
			}
		);

		return await promise;
	}

	public handleError (): void {
		// Do some error handling stuff
	}

}
