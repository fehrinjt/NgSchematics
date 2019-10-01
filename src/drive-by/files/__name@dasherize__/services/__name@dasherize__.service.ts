import { Injectable } from '@angular/core';
import { environment } from '@my-environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { <%= classify(name)%> } from './models/<%= classify(name)%>.model';
import { BaseService } from '@my-core/base.service';
// import { MessagingService } from '@agreement-tracker/services/messaging.service';

@Injectable({
  providedIn: 'root'
})
export class <%= classify(name)%>Service extends BaseService {
  apiEndpoint = '<%= classify(name)%>/';
  url = environment.serverName + environment.apiUrl + this.apiEndpoint;

  constructor(
    private http: HttpClient/*,
    private messageService: MessagingService*/
  ) {
    super();
   }

  get(filter = '', orderby = ''): Observable<<%= classify(name)%>[]> {
    return this.http.get<<%= classify(name)%>[]>(this.buildFilterOrderUrl(this.url, filter, orderby))
      .pipe(
        map((res) => res),
        catchError(() => {
           // this.messageService.addMessage('Error', 'Error getting <%= classify(name)%>s');
           return throwError('Error getting <%= classify(name)%>s');
           })
      );
  }

  getById(id: number): Observable<<%= classify(name)%>> {
    return this.http.get<<%= classify(name)%>>(`${this.url}/${id}`)
      .pipe(
        map((res) => res),
        catchError(() => {
           // this.messageService.addMessage('Error', 'Error getting <%= classify(name)%>');
           return throwError('Error getting <%= classify(name)%>');
           })
      );
  }

  add(<%= camelize(name)%>: <%= classify(name)%>): Observable<<%= classify(name)%>> {
    return this.http.post<<%= classify(name)%>>(this.url, <%= camelize(name)%>)
      .pipe(
        map((res) => res),
        catchError(() => {
           // this.messageService.addMessage('Error', 'Error creating <%= classify(name)%>');
           return throwError('Error creating <%= classify(name)%>');
           })
      );
  }

  update(<%= camelize(name)%>: <%= classify(name)%>): Observable<<%= classify(name)%>> {
    return this.http.put<<%= classify(name)%>>(`${this.url}/${this.url.<%= camelize(name)%>Id}` , <%= camelize(name)%>)
      .pipe(
        map((res) => res),
        catchError(() => {
           // this.messageService.addMessage('Error', 'Error updating <%= classify(name)%>');
           return throwError('Error updating <%= classify(name)%>');
           })
      );
  }

  delete(id: number): Observable<{}> {
    return this.http.delete<<%= classify(name)%>>(`${this.url}/${id}`)
      .pipe(
        map((res) => res),
        catchError(() => {
           // this.messageService.addMessage('Error', 'Error deleting <%= classify(name)%>');
           return throwError('Error deleting <%= classify(name)%>');
           })
      );
  }
}
