import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TableColumn} from "./table-column";
import {MatTableDataSource} from "@angular/material/table";
import {CustomAction} from "./custom-action";
import {MatSort, Sort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {PageEvent} from "@angular/material/paginator";

class PaginatedFilter {
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {

    public tableDataSource = new MatTableDataSource([]);
    public displayedColumns: string[] = [];
    @Input() customActionOneData: CustomAction | undefined;
    @Input() customActionData: CustomAction | undefined;
    searchString: string | undefined;
    @Input() totalCount: number | undefined;
    @Input() pageSize: number | undefined;
    @Output() onPageChanged = new EventEmitter<PaginatedFilter>();

    @ViewChild(MatSort, { static: true }) matSort: MatSort | undefined;

    @Input() title: string | undefined;
    @Input() subtitle: string | undefined;

    @Input() isSortable = false;
    @Input() columns: TableColumn[];

    @Input() set data(data: any[]) {
        this.setTableDataSource(data);
    }

    @Output() onFilter: EventEmitter<string> = new EventEmitter<string>();
    @Output() onReload: EventEmitter<any> = new EventEmitter<any>();
    @Output() onSort: EventEmitter<Sort> = new EventEmitter<Sort>();
    @Output() onCustomActionOne: EventEmitter<any> = new EventEmitter();
    @Output() onCustomAction: EventEmitter<any> = new EventEmitter();
    @Output() onCreateForm: EventEmitter<any> = new EventEmitter();
    @Output() onEditForm: EventEmitter<any> = new EventEmitter();
    @Output() onView: EventEmitter<any> = new EventEmitter();
    @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();

    constructor(public dialog: MatDialog) { }
    gold: EventEmitter<{ data: CustomAction }>[];
    ngOnInit(): void {
        const columnNames = this.columns.map(
            (tableColumn: TableColumn) => tableColumn.name
        );
        this.displayedColumns = columnNames;
    }

    ngAfterViewInit(): void {
        this.tableDataSource.sort = this.matSort;
    }

    setTableDataSource(data: any) {
        this.tableDataSource = new MatTableDataSource<any>(data);
    }
    openCustomActionOne($event: any) {
        this.onCustomActionOne.emit($event);
    }

    handleCustomAction() {
        this.onCustomAction.emit(this.tableDataSource.data);
    }

    openCreateForm() {
        this.onCreateForm.emit();
    }

    openEditForm($event?) {
        this.onEditForm.emit($event);
    }
    openViewForm($event?) {
        this.onView.emit($event);
    }

    handleReload() {
        this.searchString = '';
        this.onReload.emit();
    }

    handleFilter() {
        this.onFilter.emit(this.searchString);
    }

    handleSort(sortParams: Sort) {
        // @ts-ignore
        sortParams.active = this.columns.find((column) => column.name === sortParams.active).dataKey;
        if (sortParams.direction == "")
        {
            sortParams.direction = "asc";
        }
        this.onSort.emit(sortParams);
    }

    openDeleteConfirmationDialog($event: string) {
    }

    onPageChange(pageEvent: PageEvent) {
        const event: PaginatedFilter = {
            pageNumber: pageEvent.pageIndex + 1 ?? 1,
            pageSize: pageEvent.pageSize ?? 10,
        };
        this.onPageChanged.emit(event);
    }

    isAllSelected() {
        let result = true;
        this.tableDataSource.data.forEach(element => {
            // @ts-ignore
            if (element.selected === false) {
                result = false;
            } else {
                return;
            }
        });
        return result;
    }

    toggleTableDataSourceChecking(condition: boolean) {
        this.tableDataSource.data.forEach(element => {
            element.selected = condition;
        });
    }

    masterToggle() {
        console.log(this.isAllSelected());
        this.isAllSelected() ? this.toggleTableDataSourceChecking(false) : this.toggleTableDataSourceChecking(true);
    }

}
