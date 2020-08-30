import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NotificationModel } from './notification.model';
import { NotificationService } from './service/notification.service';


@Component({
	selector: 'app-notifications',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {


	@Input()
	public notification: NotificationModel;

	public markAsReadTimer: ReturnType<typeof setTimeout>;


	constructor ( private notificationService: NotificationService ) { }


	ngOnInit (): void {
		this.startMarkAsReadTimer( this.notification );
	}

	ngOnDestroy (): void {
		this.startMarkAsReadTimer( this.notification );
	}


	public startMarkAsReadTimer ( notification: NotificationModel ): void {
		this.markAsReadTimer =
			setTimeout( () => {
				this.notificationService.addNotificationToMarkAsReadPool( notification );
			}, 3000 );
	}

	public stopMarkAsReadTimer (): void {
		if ( this.markAsReadTimer ) {
			clearTimeout( this.markAsReadTimer );
		}
	}
}
