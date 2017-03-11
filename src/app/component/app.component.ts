import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: `
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['../../app/css/app.component.css']
})
export class AppComponent {
  title = 'Tasks List';
}
