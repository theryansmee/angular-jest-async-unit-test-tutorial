import { Injectable, OnDestroy } from '@angular/core';
import { NotificationModel } from '../notification.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
	providedIn: 'root'
})
export class NotificationService implements OnDestroy {


	public markAsReadPool: NotificationModel[] = [];

	public markAsReadInterval: ReturnType<typeof setInterval>;


	constructor ( private http: HttpClient ) { }


	ngOnDestroy (): void {
		this.stopMarkAsReadInterval();
	}


	public addNotificationToMarkAsReadPool ( notification: NotificationModel ): void {
		this.markAsReadPool.push( notification );

		if ( !this.markAsReadInterval ) {
			this.startMarkAsReadInterval();
		}
	}

	public startMarkAsReadInterval (): void {
		this.markAsReadInterval =
			setInterval( () => {
				this.markNotificationsAsRead( this.markAsReadPool );
			}, 5000 );
	}

	public stopMarkAsReadInterval (): void {
		if ( this.markAsReadInterval ) {
			clearInterval( this.markAsReadInterval );
		}
	}

	public markNotificationsAsRead ( notifications: NotificationModel[] ): void {
		if ( notifications.length ) {
			const url: string = `${ environment.apiUrl }/v1/notifications/read`;

			this.http.post( url, notifications )
				.subscribe(
					() => {
						// ..Do some stuff here
					}
				);
		}
	}
}
