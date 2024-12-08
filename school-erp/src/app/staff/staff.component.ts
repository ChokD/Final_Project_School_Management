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
  }

  addOrUpdateStaff() {
    if (this.editIndex !== null) {
      this.staffList[this.editIndex] = this.newStaff;
      this.editIndex = null;
    } else {
      this.staffList.push({ ...this.newStaff });
    }
    this.newStaff = { firstName: '', lastName: '', id: '', role: '', salary: '' };
    this.saveStaffList();
  }

  editStaff(index: number) {
    this.newStaff = { ...this.staffList[index] };
    this.editIndex = index;
  }

  deleteStaff(index: number) {
    this.staffList.splice(index, 1);
    this.saveStaffList();
  }

  onSubmit() {
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