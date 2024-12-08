import { Component, OnInit } from '@angular/core';
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
export class StudentComponent implements OnInit {
  studentList: Student[] = [];
  newStudent: Student = { firstName: '', lastName: '', id: '', year: 1, classroom: '' };
  editIndex: number | null = null;
  years: number[] = [1, 2, 3, 4, 5]; // ตัวเลือกสำหรับ Year

  ngOnInit() {
    this.loadStudentList();
  }

  addOrUpdateStudent() {
    if (this.editIndex !== null) {
      this.studentList[this.editIndex] = { ...this.newStudent };
      this.editIndex = null;
    } else {
      this.studentList.push({ ...this.newStudent });
    }
    this.newStudent = { firstName: '', lastName: '', id: '', year: 1, classroom: '' };
    this.saveStudentList();
  }

  editStudent(index: number) {
    this.newStudent = { ...this.studentList[index] };
    this.editIndex = index;
  }

  deleteStudent(index: number) {
    this.studentList.splice(index, 1);
    this.saveStudentList();
  }

  onSubmit() {
    this.addOrUpdateStudent();
  }

  saveStudentList() {
    localStorage.setItem('studentList', JSON.stringify(this.studentList));
  }

  loadStudentList() {
    const savedList = localStorage.getItem('studentList');
    if (savedList) {
      this.studentList = JSON.parse(savedList);
    }
  }
}
