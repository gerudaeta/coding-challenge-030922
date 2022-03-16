import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FormControl, Validators} from "@angular/forms";
import {Task} from "../../models/task.model";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'completed'];
  dataSource = new MatTableDataSource<any>();
  tasks: Array<Task> = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  taskFormControl = new FormControl('', Validators.required);

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getAllTasks();
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }

  getAllTasks(): void {
    this.taskService.getAllTasks().subscribe(x => {
      this.tasks = x;
      this.dataSource.data = this.tasks;
    });
  }


  addTask() {
    let lastId = this.tasks.length + 1;
    const task = new Task();
    task.id = lastId;
    task.name = this.taskFormControl.value;
    task.completed = false;

    this.tasks.push(task);
    this.dataSource.data = this.tasks;
    console.log('task', task);
  }
}
