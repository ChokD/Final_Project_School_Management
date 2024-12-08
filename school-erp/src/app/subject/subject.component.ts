import { Component, OnInit } from '@angular/core';
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
export class SubjectComponent implements OnInit {
  newSubject: Subject = { subjectName: '', code: '', responsibleTeacher: '', price: '' };
  editIndex: number | null = null;
  subjectList: Subject[] = [];
  isValidCode: boolean = true;
  isValidSubjectName: boolean = true;
  isValidResponsibleTeacher: boolean = true;
  isFormValid: boolean = true;
  showAlertPopup: boolean = false;
  alertMessage: string = '';

  ngOnInit() {
    this.loadSubjects();
  }

  addOrUpdateSubject() {
    if (this.editIndex !== null) {
      this.subjectList[this.editIndex] = this.newSubject;
      this.editIndex = null;
    } else {
      this.newSubject.code = this.generateNextCode();
      this.subjectList.push({ ...this.newSubject });
    }
    this.newSubject = { subjectName: '', code: '', responsibleTeacher: '', price: '' };
    this.saveSubjects();
  }

  editSubject(index: number) {
    this.newSubject = { ...this.subjectList[index] };
    this.editIndex = index;
  }

  deleteSubject(index: number) {
    this.subjectList.splice(index, 1);
    this.saveSubjects();
  }

  onSubmit(form: any) {
    this.validateForm();
    if (form.invalid || !this.isFormValid) {
      this.showAlert('Please fill all the form fields correctly.');
      return;
    }
    if (confirm('Are you sure you want to submit the form?')) {
      this.addOrUpdateSubject();
      this.showAlert('Submit Successful!');
    }
  }

  showAlert(message: string) {
    this.alertMessage = message;
    this.showAlertPopup = true;
  }

  closeAlert() {
    this.showAlertPopup = false;
  }

  validateForm() {
    // Validate subject name to contain only letters (both Thai and English)
    this.isValidSubjectName = /^[a-zA-Zก-ฮ่-๋็์ะาิีึเแโใไ]+$/.test(this.newSubject.subjectName.trim());

    // Validate responsible teacher name to contain only letters (both Thai and English)
    this.isValidResponsibleTeacher = /^[a-zA-Zก-ฮ่-๋็์ะาิีึเแโใไ]+$/.test(this.newSubject.responsibleTeacher.trim());
    if (!this.isValidResponsibleTeacher && /\d/.test(this.newSubject.responsibleTeacher)) {
      this.showAlert('Responsible Teacher must contain only letters.');
    }

    // Validate code to be in the format S001, S002, etc.
    this.isValidCode = /^S\d{3}$/.test(this.newSubject.code.trim());

    // Update form validity status
    this.isFormValid = this.isValidSubjectName && this.isValidResponsibleTeacher && this.isValidCode;
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

  saveSubjects() {
    localStorage.setItem('subjectList', JSON.stringify(this.subjectList));
  }

  loadSubjects() {
    const savedSubjects = localStorage.getItem('subjectList');
    if (savedSubjects) {
      this.subjectList = JSON.parse(savedSubjects);
    }
  }
}