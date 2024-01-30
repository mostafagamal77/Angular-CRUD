import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { SnakeBarService } from 'src/app/services/snake-bar.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'company',
    'education',
    'experience',
    'package',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  employees: Employee[] = [];
  openDelModal: boolean = false;

  constructor(
    private _empService: EmployeeService,
    private _dialog: MatDialog,
    private _SnakeBarService: SnakeBarService
  ) {}
  ngOnInit(): void {
    this.getEmployees();
  }

  openAddEditForm() {
    const dialogRef = this._dialog.open(AddEditEmployeeComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) this.getEmployees();
      },
    });
  }

  getEmployees() {
    this._empService.getEmployees().subscribe({
      next: (res) => {
        this.employees = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmp(id: number | string) {
    this._empService.deleteEmp(id).subscribe({
      next: (res) => {
        this._SnakeBarService.openSnackBar('Employee Deleted', 'OK');
        this.getEmployees();
        this.openDelModal = false;
      },
    });
  }

  openEditEmp(row: Employee) {
    const dialogRef = this._dialog.open(AddEditEmployeeComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) this.getEmployees();
      },
    });
  }

  openModal() {
    this.openDelModal = true;
  }
  closeModal() {
    this.openDelModal = false;
  }
}
