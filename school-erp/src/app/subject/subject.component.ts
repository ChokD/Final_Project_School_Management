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
  isValidCode: boolean = true;
  isValidSubjectName: boolean = true;
  isValidResponsibleTeacher: boolean = true;
  isFormValid: boolean = true;

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
    this.validateForm();
    if (form.invalid || !this.isFormValid) {
      alert('Please fill all the form fields correctly.');
      return;
    }
    if (confirm('Are you sure you want to submit the form?')) {
      this.addOrUpdateSubject();
      this.showAlert();
    }
  }

  showAlert() {
    alert('Submit Successful!');
  }

  validateForm() {
    // Validate subject name to contain only letters (both Thai and English)
    this.isValidSubjectName = /^[a-zA-Zก-ฮ่-๋็์ะาิีึเแโใไ]+$/.test(this.newSubject.subjectName.trim());

    // Validate responsible teacher name to contain only letters (both Thai and English)
    this.isValidResponsibleTeacher = /^[a-zA-Zก-ฮ่-๋็์ะาิีึเแโใไ]+$/.test(this.newSubject.responsibleTeacher.trim());
    if (!this.isValidResponsibleTeacher && /\d/.test(this.newSubject.responsibleTeacher)) {
      alert('Responsible Teacher must contain only letters.');
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
}