import { NameCheckerComponent } from './name-checker.component';


describe( 'NameCheckerComponent', () => {
	let fixture: NameCheckerComponent;

	beforeEach( () => {
		fixture = new NameCheckerComponent();
	});

	describe( 'returnFullNamePromise', () => {
		it( 'should return `Ryan Smee` if `Ryan` is passed', () => {
			// Option 1
			// fixture.returnFullNamePromise( 'Tom' )
			// 	.then(
			// 		( result ) => {
			// 			expect( result ).toEqual( 'Ryan Smee' );
			// 			done();
			// 		}
			// 	);

			// Option 2
			// return fixture.returnFullNamePromise( 'Tom' )
			// 	.then(
			// 		( result ) => {
			// 			expect( result ).toEqual( 'Ryan Smee' );
			// 		}
			// 	);

			// Option 3
			return expect( fixture.returnFullNamePromise( 'Ryan' ) )
				.resolves.toEqual( 'Ryan Smee' );
		});

		it( 'should reject with `👎`', () => {
			return expect( fixture.returnFullNamePromise( 'Tom' ) )
				.rejects.toEqual( '👎' );
		});
	});

	describe( 'returnFullNameAsyncAwaitPromise', () => {
		it( 'should return `Ryan Smee` if `Ryan` is passed', async () => {
			// Option 1
			// const result = await fixture.returnFullNameAsyncAwaitPromise( 'Tom' );
			//
			// expect( result ).toEqual( 'Ryan Smee' );

			// Option 2
			await expect( fixture.returnFullNameAsyncAwaitPromise( 'Ryan' ) )
				.resolves.toEqual( 'Ryan Smee' );
		});

		it( 'should reject with `👎`', async () => {
			await expect( fixture.returnFullNameAsyncAwaitPromise( 'TOm' ) )
				.rejects.toEqual( '👎' );
		});
	});

	describe( 'setWelcomeMessage', () => {
		it( 'should set welcomeMessage with the returned fullName', ( done ) => {
			jest.spyOn( fixture, 'returnFullNamePromise' )
				.mockResolvedValue('Travis Barker' );
			fixture.welcomeMessage = undefined;

			fixture.setWelcomeMessage( 'Ryan' );

			process.nextTick( () => {
				expect( fixture.welcomeMessage ).toEqual( 'Welcome Travis Barker!' );
				done();
			});
		});

		it( 'should call handleError when returnFullNamePromise rejects', ( done ) => {
			const handleErrorSpy = jest.spyOn( fixture, 'handleError' );
			jest.spyOn( fixture, 'returnFullNamePromise' )
				.mockRejectedValue( null );

			fixture.setWelcomeMessage( 'Tom' );

			process.nextTick(() => {
				expect( handleErrorSpy ).toBeCalled();
				done();
			});
		});
	});
});
