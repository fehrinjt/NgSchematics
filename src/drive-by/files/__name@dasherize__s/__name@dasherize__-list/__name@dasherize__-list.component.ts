import { Component, OnInit } from '@angular/core';
import { TelerikColumn } from '@lc-shared/interfaces/telerik-column.interface';
import { <%= classify(name)%> } from '../models/<%= camelize(name)%>.model';
import { <%= classify(name)%>Service } from '../services/<%= camelize(name)%>.service';
import { MessagingService } from '@lc-core/services/messaging.service';

@Component({
  selector: 'app-<%= camelize(name)%>-list',
  templateUrl: './<%= camelize(name)%>-list.component.html',
  styleUrls: ['./<%= camelize(name)%>-list.component.scss']
})
export class <%= classify(name)%>ListComponent implements OnInit {
  <%= camelize(name)%>s$ = this.<%= camelize(name)%>Service.items$;
  selected<%= classify(name)%>$ = this.<%= camelize(name)%>Service.selectedAction$;
  cols: TelerikColumn[];
  loading$ = this.<%= camelize(name)%>Service.loading$;
  loadingSelected$ = this.<%= camelize(name)%>Service.loadingSelected$;
  saving$ = this.<%= camelize(name)%>Service.saving$;
  show<%= classify(name)%>Edit = false;
  isNew<%= classify(name)%> = false;

  constructor(
    private <%= camelize(name)%>Service: <%= classify(name)%>Service,
    private messageService: MessagingService
  ) { }

  ngOnInit(): void {
    this.loadData();

    this.cols = [];
    this.cols.push(new TelerikColumn('<%= camelize(name)%>Id', 'ID'));

    this.<%= camelize(name)%>Service.updateSuccessAction$
      .subscribe(upd => {
          this.show<%= classify(name)%>Edit = false;
          this.<%= camelize(name)%>Service.select(null);
      });

    this.<%= camelize(name)%>Service.deleteSuccessAction$
      .subscribe(message => {
        this.messageService.addNotification('Successfully Deleted', 'success');
      });

    this.<%= camelize(name)%>Service.createSuccessAction$
      .subscribe(m => {
        this.messageService.addNotification('Successfully Added', 'success');
        this.<%= camelize(name)%>Service.select(null);
        this.show<%= classify(name)%>Edit = false;
      });
  }

  loadData() {
    this.<%= camelize(name)%>Service.load();
  }

  selected(<%= camelize(name)%>: <%= classify(name)%>) {
    // TODO: This will take you to a new page for view/edit/add
    // this.router.navigate(['/admin/products', product.productId]);

    // TODO: This will keep you on the same page and show the view/edit/add as a modal popup
    this.isNew<%= classify(name)%> = false;
    this.show<%= classify(name)%>Edit = true;
    this.<%= camelize(name)%>Service.select(<%= camelize(name)%>.<%= camelize(name)%>Id);
  }

  addNew() {
    // TODO: This will take you to a new page for view/edit/add
    // this.router.navigate(['/admin/<%= camelize(name)%>s', -1]);

    // TODO: This will keep you on the same page and show the view/edit/add as a modal popup
    console.log('add new');
    this.isNew<%= classify(name)%> = true;
    this.<%= camelize(name)%>Service.select(null);
    this.show<%= classify(name)%>Edit = true;
  }

  remove<%= classify(name)%>(<%= camelize(name)%>: <%= classify(name)%>) {
    this.<%= camelize(name)%>Service.delete(<%= camelize(name)%>.<%= camelize(name)%>Id);
  }

  closeModal() {
    this.<%= camelize(name)%>Service.select(null);
    this.show<%= classify(name)%>Edit = false;
  }

  save<%= classify(name)%>(<%= camelize(name)%>: <%= classify(name)%>) {
    if (<%= camelize(name)%>.<%= camelize(name)%>Id && <%= camelize(name)%>.<%= camelize(name)%>Id > 0) {
      this.update<%= classify(name)%>(<%= camelize(name)%>);
    } else {
      this.saveNew<%= classify(name)%>(<%= camelize(name)%>);
    }
  }

  update<%= classify(name)%>(<%= camelize(name)%>: <%= classify(name)%>) {
    this.<%= camelize(name)%>Service.update(<%= camelize(name)%>, <%= camelize(name)%>.<%= camelize(name)%>Id);
  }

  saveNew<%= classify(name)%>(<%= camelize(name)%>: <%= classify(name)%>) {
    this.<%= camelize(name)%>Service.create(<%= camelize(name)%>);
  }
}
