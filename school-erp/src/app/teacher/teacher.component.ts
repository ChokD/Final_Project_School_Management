import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Teacher {
  firstName: string;
  lastName: string;
  teacherId: string;
  subject: string;
  position: string;
  salary: number;
}

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {
  teacherList: Teacher[] = [
    {
      firstName: 'Jane',
      lastName: 'Smith',
      teacherId: 'T001',
      subject: 'Mathematics',
      position: 'Head Teacher',
      salary: 50000
    }
  ];

  newTeacher: Teacher = {
    firstName: '',
    lastName: '',
    teacherId: '',
    subject: '',
    position: '',
    salary: 0
  };

  editIndex: number | null = null;

  addOrUpdateTeacher() {
    if (this.editIndex !== null) {
      this.teacherList[this.editIndex] = this.newTeacher;
      this.editIndex = null;
    } else {
      this.teacherList.push({ ...this.newTeacher });
    }
    this.clearForm();
  }

  editTeacher(index: number) {
    this.newTeacher = { ...this.teacherList[index] };
    this.editIndex = index;
  }

  deleteTeacher(index: number) {
    this.teacherList.splice(index, 1);
  }

  clearForm() {
    this.newTeacher = {
      firstName: '',
      lastName: '',
      teacherId: '',
      subject: '',
      position: '',
      salary: 0
    };
  }

  onSubmit() {
    this.addOrUpdateTeacher();
  }
}
