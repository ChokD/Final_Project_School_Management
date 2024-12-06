import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Grades {
  studentid: string;
  subjectcode: string;
  score: string;
  grade: string;
}

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent {
  gradesList: Grades[] = [
    { studentid: 'Student ID', subjectcode: 'Subject Code', score: '75', grade: 'B' }
  ];
  newgrades: Grades = { studentid: '', subjectcode: '', score: '', grade: ''};
  editIndex: number | null = null;

  addOrUpdateStaff() {
    if (this.editIndex !== null) {
      this.gradesList[this.editIndex] = this.newgrades;
      this.editIndex = null;
    } else {
      this.gradesList.push(this.newgrades);
    }
    this.newgrades = { studentid: '', subjectcode: '', score: '', grade: '' };
  }

  editStaff(index: number) {
    this.newgrades = { ...this.gradesList[index] };
    this.editIndex = index;
  }

  deleteGrade(index: number) {
    this.gradesList.splice(index, 1);
  }

  onSubmit() {
    this.gradesList.push({ ...this.newgrades });
    this.newgrades = { studentid: '', subjectcode: '', score: '', grade: ''};
    setTimeout(() => {
      const rows = document.querySelectorAll('tbody tr');
      rows[rows.length - 1].classList.add('new-row');
    }, 0);
  }
}
