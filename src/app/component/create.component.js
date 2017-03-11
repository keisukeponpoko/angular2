"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var newTask_1 = require('../entity/newTask');
var work_1 = require('../entity/work');
var task_service_1 = require('../service/task.service');
var WORKS = [
    { name: '技術調査', short_time: 0, middle_time: 0, long_time: 0, spend_time: 0 },
    { name: '開発1', short_time: 0, middle_time: 0, long_time: 0, spend_time: 0 },
    { name: '開発2', short_time: 0, middle_time: 0, long_time: 0, spend_time: 0 },
    { name: '開発3', short_time: 0, middle_time: 0, long_time: 0, spend_time: 0 },
    { name: '開発4', short_time: 0, middle_time: 0, long_time: 0, spend_time: 0 },
    { name: 'レビュー修正', short_time: 0, middle_time: 0, long_time: 0, spend_time: 0 },
    { name: 'テスト仕様書', short_time: 0, middle_time: 0, long_time: 0, spend_time: 0 },
    { name: 'テスト実施', short_time: 0, middle_time: 0, long_time: 0, spend_time: 0 },
    { name: 'リリース', short_time: 0, middle_time: 0, long_time: 0, spend_time: 0 },
];
var CreateComponent = (function () {
    function CreateComponent(taskService, router) {
        this.taskService = taskService;
        this.router = router;
        this.works = [];
        this.task = new newTask_1.NewTask();
        this.reports = Array();
        this.limitTime = 0;
        this.bufferTime = 0;
    }
    CreateComponent.prototype.ngOnInit = function () {
        this.works = WORKS;
    };
    CreateComponent.prototype.onSubmit = function () {
        this.taskService.create(this.task, this.works);
        this.createReport();
    };
    CreateComponent.prototype.addWork = function () {
        this.works.push(new work_1.Work());
    };
    CreateComponent.prototype.deleteWork = function (key) {
        this.works.splice(key, 1);
    };
    CreateComponent.prototype.createReport = function () {
        this.calculate();
        this.reports = Array();
        var shortTime = this.task.short_time;
        var middleTime = this.task.middle_time;
        var longTime = this.task.long_time;
        this.limitTime = Math.floor((shortTime + (middleTime * 4) + longTime) / 6 * 10 / 10);
        this.bufferTime = Math.floor((longTime - shortTime) / 6 * 2 * 10) / 10;
        for (var _i = 0, _a = this.works; _i < _a.length; _i++) {
            var work = _a[_i];
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
    };
    CreateComponent.prototype.calculate = function () {
        var shortTime = 0;
        var middleTime = 0;
        var longTime = 0;
        for (var _i = 0, _a = this.works; _i < _a.length; _i++) {
            var work = _a[_i];
            shortTime += work.short_time ? work.short_time : 0;
            middleTime += work.middle_time ? work.middle_time : 0;
            longTime += work.long_time ? work.long_time : 0;
        }
        this.task.short_time = shortTime;
        this.task.middle_time = middleTime;
        this.task.long_time = longTime;
    };
    CreateComponent.prototype.gotoBack = function () {
        this.router.navigate(['/dashboard']);
    };
    CreateComponent = __decorate([
        core_1.Component({
            selector: 'my-tasks',
            templateUrl: '../../app/html/create.component.html',
            styleUrls: ['../../app/css/create.component.css']
        }), 
        __metadata('design:paramtypes', [task_service_1.TaskService, router_1.Router])
    ], CreateComponent);
    return CreateComponent;
}());
exports.CreateComponent = CreateComponent;
//# sourceMappingURL=create.component.js.map