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

  // Validation state
  isValidFirstName: boolean = true;
  isValidLastName: boolean = true;
  isValidSalary: boolean = true;
  isValidSubject: boolean = true;
  isValidPosition: boolean = true;
  isFormValid: boolean = true;

  ngOnInit() {
    this.loadTeacherList();
    this.generateTeacherId();
  }

  generateTeacherId() {
    const lastTeacher = this.teacherList[this.teacherList.length - 1];
    const lastId = lastTeacher ? parseInt(lastTeacher.teacherId.substring(1)) : 0;
    const newId = lastId + 1;
    this.newTeacher.teacherId = `T${newId.toString().padStart(3, '0')}`;
  }

  validateForm() {
    this.isValidFirstName = /^[a-zA-Z]+$/.test(this.newTeacher.firstName.trim());
    this.isValidLastName = /^[a-zA-Z]+$/.test(this.newTeacher.lastName.trim());
    this.isValidSubject = this.newTeacher.subject !== '';
    this.isValidPosition = this.newTeacher.position !== '';
    this.isValidSalary = this.newTeacher.salary > 0;

    this.isFormValid =
      this.isValidFirstName && this.isValidLastName && this.isValidSalary &&
      this.isValidSubject && this.isValidPosition;
  }

  addOrUpdateTeacher() {
    this.validateForm();
    if (this.isFormValid) {
      if (this.editIndex !== null) {
        this.teacherList[this.editIndex] = { ...this.newTeacher };
        this.editIndex = null;
      } else {
        this.teacherList.push({ ...this.newTeacher });
      }
      this.clearForm();
      this.generateTeacherId();
      this.saveTeacherList();
    } else {
      this.showAlert('Please fix the errors before submitting.');
    }
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
    this.saveTeacherList();
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
    this.generateTeacherId();
  }

  onSubmit() {
    this.addOrUpdateTeacher();
  }

  selectText(event: FocusEvent) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.select();
  }

  saveTeacherList() {
    localStorage.setItem('teacherList', JSON.stringify(this.teacherList));
  }

  loadTeacherList() {
    const savedList = localStorage.getItem('teacherList');
    if (savedList) {
      this.teacherList = JSON.parse(savedList);
    }
  }

  showAlert(message: string) {
    const alertPopup = document.getElementById('alertPopup');
    const alertMessage = document.getElementById('alertMessage');
    if (alertPopup && alertMessage) {
      alertMessage.innerText = message;
      alertPopup.classList.add('show'); // เพิ่มคลาส show
      alertPopup.classList.remove('hide'); // ลบคลาส hide
      alertPopup.style.display = 'flex'; // ตั้งค่าให้แสดง
    }
  }
  
  closeAlert() {
    const alertPopup = document.getElementById('alertPopup');
    if (alertPopup) {
      alertPopup.classList.add('hide'); // เพิ่มคลาส hide
      alertPopup.classList.remove('show'); // ลบคลาส show
      setTimeout(() => {
        alertPopup.style.display = 'none'; // ซ่อน alertPopup หลังจากอนิเมชั่นปิด
      }, 300); // ตั้งเวลาให้พอดีกับระยะเวลาอนิเมชั่น
    }
  }
}
