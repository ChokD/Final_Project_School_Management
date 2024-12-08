import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Subject {
  subjectName: string;
  code: string;
  responsibleTeacher: string;
  price: string;
}

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent {
  newSubject: Subject = { subjectName: '', code: '', responsibleTeacher: '', price: '' };
  editIndex: number | null = null;
  subjectList: Subject[] = [];

  addOrUpdateSubject() {
    if (this.editIndex !== null) {
      this.subjectList[this.editIndex] = this.newSubject;
      this.editIndex = null;
    } else {
      this.newSubject.code = this.generateNextCode();
      this.subjectList.push({ ...this.newSubject });
    }
    this.newSubject = { subjectName: '', code: '', responsibleTeacher: '', price: '' };
  }

  editSubject(index: number) {
    this.newSubject = { ...this.subjectList[index] };
    this.editIndex = index;
  }

  deleteSubject(index: number) {
    this.subjectList.splice(index, 1);
  }

  onSubmit(form: any) {
    if (form.invalid) {
      alert('Please fill all the form fields.');
      return;
    }
    this.addOrUpdateSubject();
  }

  generateNextCode(): string {
    if (this.subjectList.length === 0) {
      return 'S001';
    }
    const lastCode = this.subjectList[this.subjectList.length - 1].code;
    const lastNumber = parseInt(lastCode.substring(1), 10);
    const nextNumber = lastNumber + 1;
    return 'S' + nextNumber.toString().padStart(3, '0');
  }
}