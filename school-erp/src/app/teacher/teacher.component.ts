import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./teacher.component.css'],
})
export class TeacherComponent implements OnInit {
  teacherList: Teacher[] = [
    {
      firstName: 'Thanarut',
      lastName: 'Rungruangwisetchai',
      teacherId: 'T001',
      subject: 'Mathematics',
      position: 'Head Teacher',
      salary: 50000,
    },
  ];

  newTeacher: Teacher = {
    firstName: '',
    lastName: '',
    teacherId: '',
    subject: '',
    position: '',
    salary: 0,
  };

  editIndex: number | null = null;

  ngOnInit() {
    this.loadTeacherList(); // โหลดข้อมูลจาก localStorage เมื่อเริ่มต้น
    this.generateTeacherId(); // สร้าง Teacher ID เมื่อเริ่มต้น
  }

  generateTeacherId() {
    const lastTeacher = this.teacherList[this.teacherList.length - 1];
    const lastId = lastTeacher ? parseInt(lastTeacher.teacherId.substring(1)) : 0;
    const newId = lastId + 1;
    this.newTeacher.teacherId = `T${newId.toString().padStart(3, '0')}`;
  }

  addOrUpdateTeacher() {
    if (this.editIndex !== null) {
      this.teacherList[this.editIndex] = { ...this.newTeacher };
      this.editIndex = null;
    } else {
      this.teacherList.push({ ...this.newTeacher });
    }
    this.clearForm();
    this.generateTeacherId(); // สร้าง Teacher ID ใหม่หลังเพิ่มหรืออัปเดตข้อมูล
    this.saveTeacherList(); // บันทึกข้อมูลหลังจากที่มีการเพิ่มหรืออัปเดต
  }

  editTeacher(index: number) {
    this.newTeacher = { ...this.teacherList[index] };
    this.editIndex = index;
  }

  deleteTeacher(index: number) {
    this.teacherList.splice(index, 1);
    if (this.editIndex === index) {
      this.clearForm();
      this.generateTeacherId();
    }
    this.saveTeacherList(); // บันทึกข้อมูลหลังจากที่มีการลบข้อมูล
  }

  clearForm() {
    this.newTeacher = {
      firstName: '',
      lastName: '',
      teacherId: '',
      subject: '',
      position: '',
      salary: 0,
    };
    this.generateTeacherId(); // คืนค่า Teacher ID ใหม่เมื่อฟอร์มถูกล้าง
  }

  onSubmit() {
    this.addOrUpdateTeacher();
  }

  selectText(event: FocusEvent) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.select();
  }

  saveTeacherList() {
    localStorage.setItem('teacherList', JSON.stringify(this.teacherList)); // บันทึกข้อมูลลงใน localStorage
  }

  loadTeacherList() {
    const savedList = localStorage.getItem('teacherList');
    if (savedList) {
      this.teacherList = JSON.parse(savedList); // โหลดข้อมูลจาก localStorage
    }
  }
}
