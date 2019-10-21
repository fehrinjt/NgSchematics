import { Injectable } from '@angular/core';
import { environment } from '@lc-app/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { <%= classify(name)%> } from '../models/<%= camelize(name)%>.model';
import { BaseService } from '@lc-app/core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class <%= classify(name)%>Service extends BaseService {
  apiEndpoint = '<%= camelize(name)%>s/';
  // url = environment.serverName + environment.apiUrl + this.apiEndpoint;
  url = 'assets/mock/<%= camelize(name)%>s.json';

  constructor(
    private http: HttpClient
  ) {
    super();
   }

  get(filter = '', orderby = ''): Observable<<%= classify(name)%>[]> {
    return this.http.get<<%= classify(name)%>[]>(this.buildFilterOrderUrl(this.url, filter, orderby))
      .pipe(
        map((res) => res),
        catchError(() => {
          this.messageService.addNotification('Error getting <%= classify(name)%>s');
          return throwError('Error getting <%= classify(name)%>s');
        })
      );
  }

  getById(id: number): Observable<<%= classify(name)%>> {
    return this.http.get<<%= classify(name)%>[]>(this.url)
      .pipe(
        map((res) => res.filter(p => p.<%= camelize(name)%>Id === id)[0]),
        catchError(() => {
          this.messageService.addNotification('Error getting <%= classify(name)%>');
          return throwError('Error getting <%= classify(name)%>');
        })
      );
  }

  add(<%= camelize(name)%>: <%= classify(name)%>): Observable<<%= classify(name)%>> {
    return this.http.post<<%= classify(name)%>>(this.url, <%= camelize(name)%>)
      .pipe(
        map((res) => res),
        catchError(() => {
          this.messageService.addNotification('Error creating <%= classify(name)%>');
          return throwError('Error creating <%= classify(name)%>');
        })
      );
  }

  update(<%= camelize(name)%>: <%= classify(name)%>): Observable<<%= classify(name)%>> {
    return this.http.put<<%= classify(name)%>>(this.url + '/' + <%= camelize(name)%>.<%= camelize(name)%>Id, <%= camelize(name)%>)
      .pipe(
        map((res) => res),
        catchError(() => {
          this.messageService.addNotification('Error updating <%= classify(name)%>');
          return throwError('Error updating <%= classify(name)%>');
        })
      );
  }

  delete(<%= camelize(name)%>: <%= classify(name)%>): Observable<<%= classify(name)%>> {
    return this.http.delete<<%= classify(name)%>>(this.url + '/' + <%= camelize(name)%>.<%= camelize(name)%>Id)
      .pipe(
        map((res) => res),
        catchError(() => {
          this.messageService.addNotification('Error updating <%= classify(name)%>');
          return throwError('Error updating <%= classify(name)%>');
        })
      );
  }
}
