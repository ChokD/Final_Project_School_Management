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

  isValidFirstName = true;
  isValidLastName = true;
  isValidId = true;
  isFormValid = true;

  ngOnInit() {
    this.loadStudentList();
  }

  validateForm() {
    // ตรวจสอบชื่อให้มีตัวอักษร
    this.isValidFirstName = /^[a-zA-Z]+$/.test(this.newStudent.firstName.trim());
    this.isValidLastName = /^[a-zA-Z]+$/.test(this.newStudent.lastName.trim());
    
    // ตรวจสอบให้ ID เป็นตัวเลขเท่านั้น
    this.isValidId = /^[0-9]+$/.test(this.newStudent.id.trim());
  
    // อัพเดตสถานะของฟอร์ม
    this.isFormValid = this.isValidFirstName && this.isValidLastName && this.isValidId;
  }
  
  capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  addOrUpdateStudent() {
    this.validateForm();
    if (this.isFormValid) {
      if (this.editIndex !== null) {
        // แก้ไขข้อมูลนักเรียน
        this.studentList[this.editIndex] = { ...this.newStudent };
        this.editIndex = null;
      } else {
        // เพิ่มข้อมูลนักเรียนใหม่
        this.studentList.push({ ...this.newStudent });
      }
      // รีเซ็ตฟอร์ม
      this.newStudent = { firstName: '', lastName: '', id: '', year: 1, classroom: '' };
      this.saveStudentList();
    } else {
      alert('Please fix the errors before submitting.');
    }
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
