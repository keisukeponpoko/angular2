import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let tasks = [
      {id: 11, name: 'タスク1', is_finished: true, owner_id: 1, relese: new Date().toLocaleDateString(), spend_time: 4.3, short_time: 2, middle_time: 3, long_time: 4.5},
      {id: 12, name: 'タスク2', is_finished: false, owner_id: 1, relese: new Date().toLocaleDateString(), spend_time: 4.3, short_time: 2, middle_time: 3, long_time: 4.5},
      {id: 13, name: 'タスク3', is_finished: true, owner_id: 2, relese: new Date().toLocaleDateString(), spend_time: 4.3, short_time: 2, middle_time: 3, long_time: 4.5},
      {id: 14, name: 'タスク4', is_finished: false, owner_id: 2, relese: new Date().toLocaleDateString(), spend_time: 4.3, short_time: 2, middle_time: 3, long_time: 4.5},
    ];
    return {tasks};
  }
}
