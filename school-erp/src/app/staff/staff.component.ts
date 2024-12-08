import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Staff {
  firstName: string;
  lastName: string;
  id: string;
  role: string;
  salary: string;
}

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  staffList: Staff[] = [];
  newStaff: Staff = { firstName: '', lastName: '', id: '', role: '', salary: '' };
  editIndex: number | null = null;

  ngOnInit() {
    this.loadStaffList();
    this.generateStaffId();
  }

  generateStaffId() {
    const lastStaff = this.staffList[this.staffList.length - 1];
    const lastId = lastStaff ? parseInt(lastStaff.id.substring(1)) : 0;
    const newId = lastId + 1;
    this.newStaff.id = `E${newId.toString().padStart(3, '0')}`;
  }

  addOrUpdateStaff() {
    if (this.editIndex !== null) {
      this.staffList[this.editIndex] = { ...this.newStaff };
      this.editIndex = null;
    } else {
      this.staffList.push({ ...this.newStaff });
      setTimeout(() => {
        const rows = document.querySelectorAll('tbody tr');
        rows[rows.length - 1].classList.add('new-row');
      }, 0);
    }
    this.clearForm();
    this.saveStaffList();
    this.generateStaffId();
  }

  editStaff(index: number) {
    this.newStaff = { ...this.staffList[index] };
    this.editIndex = index;
  }

  deleteStaff(index: number) {
    this.staffList.splice(index, 1);
    this.saveStaffList();
    if (this.editIndex === index) {
      this.clearForm();
      this.generateStaffId();
    }
  }

  clearForm() {
    this.newStaff = { firstName: '', lastName: '', id: '', role: '', salary: '' };
    this.generateStaffId();
  }

  onSubmit() {
    const namePattern = /^[a-zA-Zก-ฮ่-๋็์ะาิีึเแโใไ]+$/;
    const salaryPattern = /^[0-9]+$/;

    if (!this.newStaff.firstName || !this.newStaff.lastName || !this.newStaff.role || !this.newStaff.salary) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    if (!this.newStaff.firstName || !namePattern.test(this.newStaff.firstName)) {
      alert('กรุณากรอกชื่อเป็นตัวอักษรเท่านั้น');
      return;
    }

    if (!this.newStaff.lastName || !namePattern.test(this.newStaff.lastName)) {
      alert('กรุณากรอกนามสกุลเป็นตัวอักษรเท่านั้น');
      return;
    }

    if (!this.newStaff.role) {
      alert('กรุณาเลือกบทบาท');
      return;
    }

    if (!this.newStaff.salary || !salaryPattern.test(this.newStaff.salary)) {
      alert('กรุณากรอกเงินเดือนเป็นตัวเลขเท่านั้น');
      return;
    }

    this.addOrUpdateStaff();
  }

  saveStaffList() {
    localStorage.setItem('staffList', JSON.stringify(this.staffList));
  }

  loadStaffList() {
    const savedList = localStorage.getItem('staffList');
    if (savedList) {
      this.staffList = JSON.parse(savedList);
    }
  }
}