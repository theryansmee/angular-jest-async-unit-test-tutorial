import { BonusRoundComponent } from './bonus-round.component';


describe('BonusRoundComponent', () => {
	let fixture: BonusRoundComponent;

	beforeEach( () => {
		fixture = new BonusRoundComponent();
	});

	describe( 'bonusPromiseMethod1', () => {
		beforeEach( () => {
			jest.useFakeTimers();
		});

		afterEach( () => {
			jest.clearAllTimers();
		});

		it ( 'should return `Ryan Smee` if name Ryan is passed', () => {
			const result = fixture.bonusPromiseMethod1( 'Ryan' );

			jest.advanceTimersByTime( 10000 );

			return expect( result )
				.resolves.toEqual( 'Ryan Smee' );
		});

		it ( 'should return `Ryan Smee` if name Ryan is passed', () => {
			const result = fixture.bonusPromiseMethod1( 'Tom' );

			jest.advanceTimersByTime( 10000 );

			return expect( result )
				.rejects.toEqual( '👎' );
		});
	});

	describe( 'bonusPromiseMethod2', () => {
		beforeEach( () => {
			jest.useFakeTimers();
		});

		afterEach( () => {
			jest.clearAllTimers();
		});

		describe( 'Resolves', () => {
			beforeEach( () => {
				jest.spyOn( fixture, 'bonusPromiseMethod1' )
					.mockResolvedValue( 'Travis Barker' );
			});

			it( 'should set welcome message with returned full name', ( done ) => {
				fixture.welcomeMessage = undefined;

				fixture.bonusPromiseMethod2( 'Travis' );

				process.nextTick(() => {
					jest.advanceTimersByTime( 1000 );

					expect( fixture.welcomeMessage ).toEqual( 'Welcome Travis Barker!' );
					done();
				});
			});

			it( 'should call clearBonusInterval', ( done ) => {
				const clearBonusIntervalSpy = jest.spyOn( fixture, 'clearBonusInterval' );

				fixture.bonusPromiseMethod2( 'Travis' );

				process.nextTick(() => {
					jest.advanceTimersByTime( 1000 );

					expect( clearBonusIntervalSpy ).toBeCalled();
					done();
				});
			});
		});

		describe( 'Rejects', () => {
			beforeEach( () => {
				jest.spyOn( fixture, 'bonusPromiseMethod1' )
					.mockRejectedValue( new Error( '👎' ) );
			});

			it( 'should map setInterval to bonusInterval', ( done ) => {
				fixture.bonusInterval = undefined;

				fixture.bonusPromiseMethod2( 'Ryan' );

				process.nextTick(() => {
					expect( fixture.bonusInterval ).toEqual( expect.any( Number ) );
					done();
				});
			});

			describe( 'BonusInterval boundaries', () => {
				let handleErrorSpy;

				beforeEach( () => {
					handleErrorSpy = jest.spyOn( fixture, 'handleError' );
				});

				it( 'should NOT call handleError before 15 seconds', ( done ) => {

					fixture.bonusPromiseMethod2( 'Ryan' );

					process.nextTick(() => {
						jest.advanceTimersByTime( 14999 );

						expect( handleErrorSpy ).not.toBeCalled();
						done();
					});
				});

				it( 'should call handleError after 15 seconds', ( done ) => {

					fixture.bonusPromiseMethod2( 'Ryan' );

					process.nextTick(() => {
						jest.advanceTimersByTime( 15000 );

						expect( handleErrorSpy ).toBeCalledTimes( 1 );
						done();
					});
				});

				it( 'should call handleError 4 times in 1 minute', ( done ) => {

					fixture.bonusPromiseMethod2( 'Ryan' );

					process.nextTick(() => {
						jest.advanceTimersByTime( 60000 );

						expect( handleErrorSpy ).toBeCalledTimes( 4 );
						done();
					});
				});
			});
		});
	});

	describe( 'clearBonusInterval', () => {
		it( 'should clear bonusInterval if it has been set', () => {
			fixture.bonusInterval = setTimeout( () => {}, 2000 );

			fixture.clearBonusInterval();

			expect(fixture.bonusInterval ).toBeUndefined();
		});
	});
});
