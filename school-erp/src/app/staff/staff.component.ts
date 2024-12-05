import { Component } from '@angular/core';
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
export class StaffComponent {
  staffList: Staff[] = [
    { firstName: 'First Name', lastName: 'Last Name', id: '12345', role: 'Your Role', salary: '$$$' }
  ];
  newStaff: Staff = { firstName: '', lastName: '', id: '', role: '', salary: '' };
  editIndex: number | null = null;

  addOrUpdateStaff() {
    if (this.editIndex !== null) {
      this.staffList[this.editIndex] = this.newStaff;
      this.editIndex = null;
    } else {
      this.staffList.push(this.newStaff);
    }
    this.newStaff = { firstName: '', lastName: '', id: '', role: '', salary: '' };
  }

  editStaff(index: number) {
    this.newStaff = { ...this.staffList[index] };
    this.editIndex = index;
  }

  deleteStaff(index: number) {
    this.staffList.splice(index, 1);
  }

  onSubmit() {
    this.staffList.push({ ...this.newStaff });
    this.newStaff = { firstName: '', lastName: '', id: '', role: '', salary: '' };
    setTimeout(() => {
      const rows = document.querySelectorAll('tbody tr');
      rows[rows.length - 1].classList.add('new-row');
    }, 0);
  }
}