import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Student {
  firstName: string;
  lastName: string;
  id: string;
  year: number;
  classroom: string;
}

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  studentList: Student[] = [
    { firstName: 'John', lastName: 'Doe', id: 'S001', year: 1, classroom: 'A101' }
  ];
  newStudent: Student = { firstName: '', lastName: '', id: '', year: 0, classroom: '' };
  editIndex: number | null = null;

  addOrUpdateStudent() {
    if (this.editIndex !== null) {
      this.studentList[this.editIndex] = this.newStudent;
      this.editIndex = null;
    } else {
      this.studentList.push(this.newStudent);
    }
    this.newStudent = { firstName: '', lastName: '', id: '', year: 0, classroom: '' };
  }

  editStudent(index: number) {
    this.newStudent = { ...this.studentList[index] };
    this.editIndex = index;
  }

  deleteStudent(index: number) {
    this.studentList.splice(index, 1);
  }

  onSubmit() {
    this.studentList.push({ ...this.newStudent });
    this.newStudent = { firstName: '', lastName: '', id: '', year: 0, classroom: '' };
    setTimeout(() => {
      const rows = document.querySelectorAll('tbody tr');
      rows[rows.length - 1].classList.add('new-row');
    }, 0);
  }
}
