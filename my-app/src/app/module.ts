import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
// import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { StaffComponent } from './components/staff/staff.component';
import { CoursesComponent } from './components/courses/courses.component';
import { GradesComponent } from './components/grades/grades.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // StudentsComponent,
    TeachersComponent,
    StaffComponent,
    CoursesComponent,
    GradesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
