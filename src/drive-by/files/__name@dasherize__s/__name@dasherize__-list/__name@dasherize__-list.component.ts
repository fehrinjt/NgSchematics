import { Component, OnInit } from '@angular/core';
import { <%= classify(name)%>Service } from '../services/<%= camelize(name)%>.service';
import { <%= classify(name)%> } from '../models/<%= camelize(name)%>.model';
import { finalize, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { MessagingService } from '@lc-app/core/services/messaging.service';
import { TelerikColumn } from '@lc-app/shared/interfaces/telerik-column.interface';

@Component({
  selector: 'app-<%= camelize(name)%>-list',
  templateUrl: './<%= camelize(name)%>-list.component.html',
  styleUrls: ['./<%= camelize(name)%>-list.component.scss']
})
export class <%= classify(name)%>ListComponent implements OnInit {
  <%= camelize(name)%>s: <%= classify(name)%>[];
  selected<%= classify(name)%>: <%= classify(name)%>;
  cols: TelerikColumn[];
  loading = true;
  show<%= classify(name)%>Edit = false;
  isNew<%= classify(name)%> = false;
  saving = false;

  constructor(
    private <%= camelize(name)%>Service: <%= classify(name)%>Service,
    private router: Router,
    private messageService: MessagingService
  ) { }

  ngOnInit() {
    this.loadData();

    this.cols = [];
    this.cols.push(new TelerikColumn('<%= camelize(name)%>Id', 'ID'));
    // TODO: Add more columns to match your model
  }

  loadData() {
    this.<%= camelize(name)%>Service.get()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(res => {
        this.<%= camelize(name)%>s = res;
      });
  }

  selected(<%= camelize(name)%>: <%= classify(name)%>) {
    // TODO: This will take you to a new page for view/edit/add
    // this.router.navigate(['/admin/<%= camelize(name)%>s', <%= camelize(name)%>.<%= camelize(name)%>Id]);

    // TODO: This will keep you on the same page and show the view/edit/add as a modal popup
    this.isNew<%= classify(name)%> = false;
    this.show<%= classify(name)%>Edit = true;
    this.selected<%= classify(name)%> = <%= camelize(name)%>;
  }

  addNew() {
    // TODO: This will take you to a new page for view/edit/add
    // this.router.navigate(['/admin/<%= camelize(name)%>s', -1]);

    // TODO: This will keep you on the same page and show the view/edit/add as a modal popup
    this.isNew<%= classify(name)%> = true;
    this.selected<%= classify(name)%> = new <%= classify(name)%>();
    this.show<%= classify(name)%>Edit = true;
  }

  remove<%= classify(name)%>(<%= camelize(name)%>: <%= classify(name)%>) {
    this.messageService.showDeleteConfirmation()
      .pipe(
        switchMap(res => this.<%= camelize(name)%>Service.delete(<%= camelize(name)%>)),
        catchError(err => {
          this.messageService.addNotification(err);
          return throwError('Error deleting <%= camelize(name)%>');
        })
      )
      .subscribe(res => {
        this.<%= camelize(name)%>s = this.<%= camelize(name)%>s.filter(p => p.<%= camelize(name)%>Id !== <%= camelize(name)%>.<%= camelize(name)%>Id);
        this.closeModal();
      });
  }

  closeModal() {
    this.selected<%= classify(name)%> = null;
    this.show<%= classify(name)%>Edit = false;
  }

  save<%= classify(name)%>(<%= camelize(name)%>: <%= classify(name)%>) {
    this.saving = true;
    if (<%= camelize(name)%>.<%= camelize(name)%>Id && <%= camelize(name)%>.<%= camelize(name)%>Id > 0) {
      this.update<%= classify(name)%>(<%= camelize(name)%>);
    } else {
      this.saveNew<%= classify(name)%>(<%= camelize(name)%>);
    }
  }

  update<%= classify(name)%>(<%= camelize(name)%>: <%= classify(name)%>) {
    this.<%= camelize(name)%>Service.update(<%= camelize(name)%>)
      .pipe(
        catchError(err => {
          this.messageService.addNotification(err);
          return throwError('Error updating <%= camelize(name)%>');
        }),
        finalize(() => this.saving = false)
      )
      .subscribe(res => {
        const idx = this.<%= camelize(name)%>s.findIndex(p => p.<%= camelize(name)%>Id === <%= camelize(name)%>.<%= camelize(name)%>Id);
        this.<%= camelize(name)%>s[idx] = res;
        this.<%= camelize(name)%>s = [...this.<%= camelize(name)%>s];

        this.closeModal();
      });
  }

  saveNew<%= classify(name)%>(<%= camelize(name)%>: <%= classify(name)%>) {
    this.<%= camelize(name)%>Service.add(<%= camelize(name)%>)
      .pipe(
        catchError(err => {
          this.messageService.addNotification(err);
          return throwError('Error creating <%= camelize(name)%>');
        }),
        finalize(() => this.saving = false)
      )
      .subscribe(res => {
        this.<%= camelize(name)%>s = [...this.<%= camelize(name)%>s, res];
        this.closeModal();
      });
  }
}
