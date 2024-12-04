import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [],
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
editStaff(_t6: any) {
throw new Error('Method not implemented.');
}
  staff: any[] = [];
  newStaff = { firstName: '', lastName: '', position: '' };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStaff();
  }

  loadStaff(): void {
    this.http.get<any[]>('http://localhost:4200/api/staff').subscribe(data => {
      this.staff = data;
    });
  }

  addStaff(): void {
    this.http.post('http://localhost:4200/api/staff', this.newStaff).subscribe(() => {
      this.loadStaff(); // Refresh the list
      this.newStaff = { firstName: '', lastName: '', position: '' };
    });
  }

  deleteStaff(id: number): void {
    this.http.delete(`http://localhost:4200/api/staff/${id}`).subscribe(() => {
      this.loadStaff(); // Refresh the list
    });
  }

  updateStaff(staffMember: any): void {
    this.http.put(`http://localhost:4200/api/staff/${staffMember.id}`, staffMember).subscribe(() => {
      this.loadStaff(); // Refresh the list
    });
  }
}
