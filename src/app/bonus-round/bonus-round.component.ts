import { Component, OnInit } from '@angular/core';


@Component({
	selector: 'app-bonus-round',
	templateUrl: './bonus-round.component.html',
	styleUrls: ['./bonus-round.component.scss']
})
export class BonusRoundComponent {


	public welcomeMessage: string;

	public bonusInterval: ReturnType<typeof setTimeout>;


	constructor () { }


	public bonusPromiseMethod1 (): Promise<string> {
		return new Promise(
			( resolve, reject ) => {
				setTimeout( () => {
					if ( name === 'Ryan' ) {
						resolve( 'Ryan Smee' );
					}
					else {
						reject( '👎' );
					}
				}, 10000 );
			}
		);
	}

	public bonusPromiseMethod2 (): void {
		this.welcomeMessage = 'loading..';

		this.bonusPromiseMethod1()
			.then(
				( fullName: string ) => {
					setTimeout( () => {
						this.welcomeMessage = `Welcome ${ fullName }!`;

						this.clearBonusInterval();
					}, 1000 );
				}
			)
			.catch(
				() => {
					this.bonusInterval =
						setInterval( () => {
							this.handleError();
						}, 15000 );
				}
			);
	}

	public clearBonusInterval (): void {
		if ( this.bonusInterval ) {
			clearInterval( this.bonusInterval );
			this.bonusInterval = undefined;
		}
	}

	public handleError (): void {
		// ..Some code to handle an error
	}

}
