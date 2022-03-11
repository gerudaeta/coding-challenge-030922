import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  getAllTasks(): Observable<any> {
    return this.httpClient.get("assets/json/MOCK_DATA.json");
  }
}
