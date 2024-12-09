import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Grades {
  studentid: string;
  subjectcode: string;
  score: number | null;
  grade: string;
}

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css'],
})
export class GradesComponent {

  gradesList: Grades[] = [
    {
      studentid: '1650707118',
      subjectcode: 'CS319',
      score: 80,
      grade: 'A',
    },
  ];
  
  newgrades: Grades = { studentid: '', subjectcode: '', score: null, grade: '' };
  editIndex: number | null = null;

  isValidStudentId = true;
  isValidSubjectCode = true;
  isValidScore = true;
  isFormValid = true;

  ngOnInit() {
    this.loadGradesList();
  }

  validateForm() {
    this.isValidStudentId = /^[0-9]+$/.test(this.newgrades.studentid.trim());
    this.isValidSubjectCode = /^[a-zA-Z0-9]+$/.test(this.newgrades.subjectcode.trim());
  
    // ตรวจสอบว่าคะแนนต้องเป็นตัวเลขและอยู่ในช่วง 0-100
    this.isValidScore = this.newgrades.score !== null &&
      !isNaN(this.newgrades.score) &&
      this.newgrades.score >= 0 &&
      this.newgrades.score <= 100;
  
    this.isFormValid = this.isValidStudentId && this.isValidSubjectCode && this.isValidScore;
  }
  

  onScoreChange() {
    const score = this.newgrades.score;
  
    // ถ้า score เป็น null หรือไม่ใช่ตัวเลข ให้ล้างข้อมูลในช่อง Grade
    if (score === null || isNaN(score)) {
      this.newgrades.grade = '';
      return;
    }
  
    // คำนวณเกรดตามเกณฑ์
    if (score >= 80 && score <= 100) {
      this.newgrades.grade = 'A';
    } else if (score >= 75 && score <= 79) {
      this.newgrades.grade = 'B+';
    } else if (score >= 70 && score <= 74) {
      this.newgrades.grade = 'B';
    } else if (score >= 65 && score <= 69) {
      this.newgrades.grade = 'C+';
    } else if (score >= 60 && score <= 64) {
      this.newgrades.grade = 'C';
    } else if (score >= 55 && score <= 59) {
      this.newgrades.grade = 'D+';
    } else if (score >= 50 && score <= 54) {
      this.newgrades.grade = 'D';
    } else if (score >= 0 && score <= 49) {
      this.newgrades.grade = 'F';
    } else {
      this.newgrades.grade = ''; // กรณีคะแนนไม่อยู่ในช่วงที่กำหนด
    }
  }
  
  

  onSubmit() {
    this.validateForm();

    if (
      !this.newgrades.studentid.trim() ||
      !this.newgrades.subjectcode.trim() ||
      this.newgrades.score === null ||
      this.newgrades.grade === ''
    ) {
      alert('Please fill in all fields');
      return;
    }

    if (!this.isFormValid) {
      alert('Please fill in the information correctly');
      return;
    }

    if (this.editIndex !== null) {
      this.gradesList[this.editIndex] = { ...this.newgrades };
      this.editIndex = null;
    } else {
      this.gradesList.push({ ...this.newgrades });
    }

    alert('Success');
    this.newgrades = { studentid: '', subjectcode: '', score: null, grade: '' };
    this.saveGradesList();
  }

  editGrade(index: number) {
    this.newgrades = { ...this.gradesList[index] };
    this.editIndex = index;
  }

  deleteGrade(index: number) {
    if (confirm('Are you sure you want to delete this grade?')) {
      this.gradesList.splice(index, 1);
      this.saveGradesList();
    }
  }

  saveGradesList() {
    localStorage.setItem('gradesList', JSON.stringify(this.gradesList));
  }

  loadGradesList() {
    const savedList = localStorage.getItem('gradesList');
    if (savedList) {
      this.gradesList = JSON.parse(savedList);
    }
  }
}
