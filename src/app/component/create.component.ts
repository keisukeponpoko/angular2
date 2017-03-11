import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { NewTask }                from '../entity/newTask';
import { Work }                from '../entity/work';
import { TaskService }         from '../service/task.service';
import { Observable }     from 'rxjs/Observable';

const WORKS: Work[] = [
  { name: '技術調査', short_time: 0, middle_time: 0, long_time: 0, spend_time: 0},
  { name: '開発1', short_time: 0, middle_time: 0, long_time: 0, spend_time: 0},
  { name: '開発2', short_time: 0, middle_time: 0, long_time: 0, spend_time: 0},
  { name: '開発3', short_time: 0, middle_time: 0, long_time: 0, spend_time: 0},
  { name: '開発4', short_time: 0, middle_time: 0, long_time: 0, spend_time: 0},
  { name: 'レビュー修正', short_time: 0, middle_time: 0, long_time: 0, spend_time: 0},
  { name: 'テスト仕様書', short_time: 0, middle_time: 0, long_time: 0, spend_time: 0},
  { name: 'テスト実施', short_time: 0, middle_time: 0, long_time: 0, spend_time: 0},
  { name: 'リリース', short_time: 0, middle_time: 0, long_time: 0, spend_time: 0},
];

@Component({
  selector: 'my-tasks',
  templateUrl: '../../app/html/create.component.html',
  styleUrls: [ '../../app/css/create.component.css' ]
})
export class CreateComponent implements OnInit {
  works: Work[] = [];
  task = new NewTask();
  reports = Array();
  limitTime = 0;
  bufferTime = 0;

  constructor(
    private taskService: TaskService,
    private router: Router) { }

  ngOnInit(): void {
    this.works = WORKS;
  }

  onSubmit(): void {
    this.taskService.create(this.task, this.works);
    this.createReport();
  }

  addWork(): void {
    this.works.push(new Work());
  }

  deleteWork(key: number): void {
    this.works.splice(key, 1);
  }

  createReport(): void {
    this.calculate();

    this.reports = Array();

    let shortTime = this.task.short_time;
    let middleTime = this.task.middle_time;
    let longTime = this.task.long_time;

    this.limitTime = Math.floor((shortTime + (middleTime * 4) + longTime) / 6 * 10 / 10);

    this.bufferTime = Math.floor((longTime - shortTime) / 6 * 2 * 10) / 10;

    for (let work of this.works) {
      if (work.middle_time != 0) {
        this.reports.push({
          name: work.name,
          time: Math.floor((work.middle_time / middleTime) * this.limitTime * 10) / 10
        });
      }
    }

    this.reports.push({
      name: 'バッファ',
      time: this.bufferTime
    });
  }

  calculate(): void {
    let shortTime = 0;
    let middleTime = 0;
    let longTime = 0;

    for (let work of this.works) {
      shortTime += work.short_time ? work.short_time : 0;
      middleTime += work.middle_time ? work.middle_time : 0;
      longTime += work.long_time ? work.long_time : 0;
    }

    this.task.short_time = shortTime;
    this.task.middle_time = middleTime;
    this.task.long_time = longTime;
  }

  gotoBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
