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
// Observable operators
require('rxjs/add/operator/debounceTime');
var task_service_1 = require('../service/task.service');
var DashboardComponent = (function () {
    function DashboardComponent(taskService, router) {
        this.taskService = taskService;
        this.router = router;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.taskService.getTasks().then(function (tasks) { return _this.tasks = tasks; });
    };
    DashboardComponent.prototype.search = function (term) {
        var _this = this;
        this.taskService.search(term)
            .debounceTime(300) // wait 300ms after each keystroke before considering the term
            .subscribe(function (tasks) { return _this.tasks = tasks; });
    };
    DashboardComponent.prototype.gotoCreate = function () {
        this.router.navigate(['/create']);
    };
    DashboardComponent.prototype.showWork = function (task) {
        console.log(task);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'my-dashboard',
            templateUrl: '../../app/html/dashboard.component.html',
            styleUrls: ['../../app/css/dashboard.component.css']
        }), 
        __metadata('design:paramtypes', [task_service_1.TaskService, router_1.Router])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map