import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { SnakeBarService } from 'src/app/services/snake-bar.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css'],
})
export class AddEditEmployeeComponent implements OnInit {
  empForm!: FormGroup;
  tableId: number = 1;
  education: string[] = [
    'Student',
    "Bachelor's Degree",
    "Master's Degree",
    'Doctor of Education',
  ];

  constructor(
    private _fb: FormBuilder,
    private _EmployeeService: EmployeeService,
    private _SnakeBarService: SnakeBarService,
    private _dialogRef: MatDialogRef<AddEditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.empForm = this._fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      company: ['', Validators.required],
      education: ['', Validators.required],
      experience: ['', Validators.required],
      package: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  submitData() {
    if (this.empForm.valid) {
      if (this.data) {
        this.editEmp(this.data.id, this.empForm.value);
      } else this.addEmployee(this.empForm.value);
    }
  }

  addEmployee(data: Employee) {
    this._EmployeeService.addEmployee(data).subscribe({
      next: (res) => {
        this._dialogRef.close(true);
        this._SnakeBarService.openSnackBar('Employee Added Successfully', 'OK');
      },
    });
  }

  editEmp(id: number | string, data: Employee) {
    this._EmployeeService.editEmp(id, data).subscribe({
      next: (res) => {
        this._dialogRef.close(true);
        this._SnakeBarService.openSnackBar('Employee Updated', 'OK');
      },
    });
  }
}
