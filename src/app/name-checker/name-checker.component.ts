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

	async returnFullNameAsyncAwaitPromise ( name: string ): Promise<string> {
		const promise: Promise<string> = new Promise(
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

	public setWelcomeMessage ( firstName: string ): void {
		this.returnFullNamePromise( firstName )
			.then(
				( fullName: string ) => this.welcomeMessage = `Welcome ${ fullName }!`
			)
			.catch(
				( error: string ) => this.handleError()
			);
	}

	public handleError (): void {
		// Do some error handling stuff
	}
}
