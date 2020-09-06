import { NotificationComponent } from './notification.component';
import { NotificationModel } from './notification.model';


describe('NotificationComponent', () => {
	let fixture: NotificationComponent;
	let notificationServiceMock;

	beforeEach( () => {
		notificationServiceMock = {
			addNotificationToMarkAsReadPool: jest.fn()
		};

		fixture = new NotificationComponent(
			notificationServiceMock
		);
	});

	describe( 'startMarkAsReadTimer', () => {
		let notification: NotificationModel;

		beforeEach(() => {
			notification = {
				id: 'n1',
				title: 'You have a DM'
			} as NotificationModel;
			jest.useFakeTimers();
		});

		afterEach( () => {
			jest.clearAllTimers();
		});

		it( 'should map the setTimout to markAsReadTimer', () => {
			fixture.markAsReadTimer = undefined;

			fixture.startMarkAsReadTimer( notification );

			expect( fixture.markAsReadTimer ).toEqual( expect.any( Number ) );
		});

		it( 'should trigger addNotificationToMarkAsReadPool when the setTimeout fires', () => {

			fixture.startMarkAsReadTimer( notification );
			jest.runOnlyPendingTimers();

			expect( notificationServiceMock.addNotificationToMarkAsReadPool ).toBeCalledWith( notification );
		});

		describe( 'markAsReadTimer boundaries', () => {
			it( 'should NOT call addNotificationToMarkAsReadPool before 3seconds', () => {

				fixture.startMarkAsReadTimer( notification );
				jest.advanceTimersByTime( 2999 );

				expect( notificationServiceMock.addNotificationToMarkAsReadPool ).not.toBeCalled();
			});

			it( 'should call addNotificationToMarkAsReadPool after 3seconds', () => {

				fixture.startMarkAsReadTimer( notification );
				jest.advanceTimersByTime( 3001 );

				expect( notificationServiceMock.addNotificationToMarkAsReadPool ).toBeCalledTimes( 1 );
			});

			it( 'should NOT call addNotificationToMarkAsReadPool again after its been called', () => {

				fixture.startMarkAsReadTimer( notification );
				jest.advanceTimersByTime( 12000 );

				expect( notificationServiceMock.addNotificationToMarkAsReadPool ).toBeCalledTimes( 1 );
			});
		});
	});

	describe( 'stopMarkAsReadTimer', () => {
		it( 'should clear markAsReadTimer if it has been set', () => {
			fixture.markAsReadTimer = setTimeout( () => {}, 2000 );

			fixture.stopMarkAsReadTimer();

			expect(fixture.markAsReadTimer ).toBeUndefined();
		});
	});
});
