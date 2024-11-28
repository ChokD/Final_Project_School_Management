import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { StaffComponent } from './components/staff/staff.component';
import { CoursesComponent } from './components/courses/courses.component';
import { GradesComponent } from './components/grades/grades.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'grades', component: GradesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
