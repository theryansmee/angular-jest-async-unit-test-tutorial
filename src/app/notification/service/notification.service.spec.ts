import { NotificationService } from './notification.service';

describe( 'NotificationService', () => {
	let fixture: NotificationService;
	let httpMock;

	beforeEach( () => {
		fixture = new NotificationService(
			httpMock
		);
	});

});
