import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { <%= classify(name)%>Service } from '../services/<%= dasherize(name)%>.service';
import { <%= classify(name)%> } from '../models/<%= dasherize(name)%>.model';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-<%= dasherize(name)%>-detail',
  templateUrl: './<%= dasherize(name)%>-detail.component.html',
  styleUrls: ['./<%= dasherize(name)%>-detail.component.scss']
})
export class <%= classify(name)%>DetailComponent implements OnInit {
  id: number;
  isNew = false;
  <%= camelize(name)%>: <%= classify(name)%>;
  saving = false;

  constructor(
    private route: ActivatedRoute,
    private <%= camelize(name)%>Service: <%= classify(name)%>Service,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        (this.id = +params['id']);
        if (this.id > 0) {
          this.isNew = false;
          this.get<%= classify(name)%>(this.id);
        } else {
          this.isNew = true;
          this.<%= camelize(name)%> = new <%= classify(name)%>();
        }
    }); // + turns it into a number
  }

  get<%= classify(name)%>(id: number) {
    this.<%= camelize(name)%>Service.getById(id)
      .subscribe(res => {
        this.<%= camelize(name)%> = res;
      });
  }

  cancel() {
    this.router.navigate(['/admin/<%= camelize(name)%>s']);
  }

  update(<%= camelize(name)%>: <%= classify(name)%>) {
    if (this.isNew) {
      this.insert<%= classify(name)%>(<%= camelize(name)%>);
    } else {
      this.update<%= classify(name)%>(<%= camelize(name)%>);
    }
  }

  update<%= classify(name)%>(<%= camelize(name)%>: <%= classify(name)%>) {
    this.saving = true;
    this.<%= camelize(name)%>Service.update(<%= camelize(name)%>)
      .pipe(
        catchError(err => {
          // Do something with it
          return throwError('Error updating <%= camelize(name)%>');
        }),
        finalize(() => this.saving = false)
      )
      .subscribe(res => {
        this.router.navigate(['/admin/<%= camelize(name)%>s']);
      });
  }

  insert<%= classify(name)%>(<%= camelize(name)%>: <%= classify(name)%>) {
    this.saving = true;
    this.<%= camelize(name)%>Service.add(<%= camelize(name)%>)
      .pipe(
        catchError(err => {
          // Do something with it
          return throwError('Error creating <%= camelize(name)%>');
        }),
        finalize(() => this.saving = false)
      )
      .subscribe(res => {
        this.router.navigate(['/admin/<%= camelize(name)%>s']);
      });
  }
}
