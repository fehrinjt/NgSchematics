import { Injectable } from '@angular/core';
import { MessagingService } from '@lc-core/services/messaging.service';
import { <%= classify(name)%> } from '../models/<%= camelize(name)%>.model';
import { environment } from '@environments/environment';
import { LcStore } from '@lc-core/store/lc-store.service';
import { LcHttpService } from '@lc-core/services/lc-http.service';

@Injectable({
  providedIn: 'root'
})
export class <%= classify(name)%>Service extends LcStore<<%= classify(name)%>> {
  constructor(
    http: LcHttpService<<%= classify(name)%>>,
    messageService: MessagingService
  ) {
    super(
      http,
      messageService,
      {
        idName: '<%= camelize(name)%>Id',
        apiUrl: environment.serverName + environment.apiUrl,
        controllerName: '<%= camelize(name)%>s/',
        entityName: '<%= classify(name)%>'
     }
    );
  }
}
