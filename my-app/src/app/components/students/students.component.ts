import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: any[] = [];
  newStudent = { firstName: '', lastName: '', studentId: '', grade: '', classroom: '' };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.http.get<any[]>('http://localhost:3000/api/students').subscribe(data => {
      this.students = data;
    });
  }

  addStudent(): void {
    this.http.post('http://localhost:3000/api/students', this.newStudent).subscribe(() => {
      this.loadStudents(); // Refresh the list
      this.newStudent = { firstName: '', lastName: '', studentId: '', grade: '', classroom: '' };
    });
  }

  deleteStudent(id: number): void {
    this.http.delete(`http://localhost:3000/api/students/${id}`).subscribe(() => {
      this.loadStudents(); // Refresh the list
    });
  }
}
