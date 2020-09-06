import { NotificationService } from './notification.service';


describe( 'NotificationService', () => {
	let fixture: NotificationService;
	let httpMock;

	beforeEach( () => {
		fixture = new NotificationService(
			httpMock
		);
	});

	describe( 'startMarkAsReadInterval', () => {
		let markNotificationsAsReadSpy;

		beforeEach( () => {
			jest.useFakeTimers();
			markNotificationsAsReadSpy = jest.spyOn( fixture, 'markNotificationsAsRead' );
		});

		afterEach( () => {
			jest.clearAllTimers();
		});

		it( 'should map setInterval to markAsReadInterval', () => {
			fixture.markAsReadInterval = undefined;

			fixture.startMarkAsReadInterval();

			expect( fixture.markAsReadInterval ).toEqual( expect.any( Number ) );
		});

		it( 'should trigger markNotificationsAsRead when the setInterval fires', () => {

			fixture.startMarkAsReadInterval();
			jest.runOnlyPendingTimers();

			expect( markNotificationsAsReadSpy ).toBeCalled();
		});

		describe( 'markAsReadInterval boundaries', () => {
			it( 'should NOT trigger markNotificationsAsRead before 5seconds', () => {

				fixture.startMarkAsReadInterval();
				jest.advanceTimersByTime( 4999 );

				expect( markNotificationsAsReadSpy ).not.toBeCalled();
			});

			it( 'should trigger markNotificationsAsRead after 5seconds', () => {

				fixture.startMarkAsReadInterval();
				jest.advanceTimersByTime( 5001 );

				expect( markNotificationsAsReadSpy ).toBeCalledTimes( 1 );
			});

			it( 'should trigger markNotificationsAsRead 4 times in 20seconds', () => {

				fixture.startMarkAsReadInterval();
				jest.advanceTimersByTime( 20001 );

				expect( markNotificationsAsReadSpy ).toBeCalledTimes( 4 );
			});
		});
	});
});
