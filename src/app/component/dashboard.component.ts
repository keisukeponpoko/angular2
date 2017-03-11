import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

// Observable operators
import 'rxjs/add/operator/debounceTime';

import { Task } from '../entity/task';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: '../../app/html/dashboard.component.html',
  styleUrls: [ '../../app/css/dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  tasks: Task[];

  constructor(
    private taskService: TaskService,
    private router: Router) { }

  ngOnInit(): void {
    this.taskService.getTasks().then(
      tasks => this.tasks = tasks
    );
  }

  search(term: string): void {
    this.taskService.search(term)
        .debounceTime(300)        // wait 300ms after each keystroke before considering the term
        .subscribe(
            tasks => this.tasks = tasks
        );
  }

  gotoCreate(): void {
    this.router.navigate(['/create']);
  }

  showWork(task: Task[]): void {
    console.log(task);
  }
}
