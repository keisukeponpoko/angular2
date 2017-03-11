import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Task } from '../entity/task';
import { NewTask } from '../entity/newTask';

@Injectable()
export class TaskService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private tasksUrl = 'http://localhost:8080/api/';  // URL to web api
  constructor(private http: Http) { }

  getTasks(): Promise<Task[]> {
    return this.http.get(this.tasksUrl)
               .toPromise()
               .then(response => response.json().data as Task[]);
  }
  // getTask(id: number): Promise<Hero> {
  //   const url = `${this.heroesUrl}/${id}`;
  //   return this.http.get(url)
  //     .toPromise()
  //     .then(response => response.json().data as Hero)
  //     .catch(this.handleError);
  // }
  // delete(id: number): Promise<void> {
  //   const url = `${this.heroesUrl}/${id}`;
  //   return this.http.delete(url, {headers: this.headers})
  //     .toPromise()
  //     .then(() => null)
  //     .catch(this.handleError);
  // }
  create(task: NewTask, works: any): Promise<NewTask> {
    return this.http
      .post(`${this.tasksUrl}create`, {task: JSON.stringify(task), works: JSON.stringify(works)}, {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  // update(hero: Hero): Promise<Hero> {
  //   const url = `${this.heroesUrl}/${hero.id}`;
  //   return this.http
  //     .put(url, JSON.stringify(hero), {headers: this.headers})
  //     .toPromise()
  //     .then(() => hero)
  //     .catch(this.handleError);
  // }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  search(term: string): Observable<Task[]> {
    return this.http
               .get(`${this.tasksUrl}/?name=${term}`)
               .map(response => response.json().data as Task[]);
  }
}
