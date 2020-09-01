import { NotificationComponent } from './notification.component';


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
});
