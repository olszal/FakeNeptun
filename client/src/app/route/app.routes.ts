import { Routes } from '@angular/router';
import { LoginComponent } from '../component/login/login.component';
import { StudentsListComponent } from '../component/student/students-list/students-list.component';
import { AddStudentComponent } from '../component/student/add-student/add-student.component';
import { EditStudentComponent } from '../component/student/edit-student/edit-student.component';
import { TeachersListComponent } from '../component/teacher/teacher-list/teacher-list.component';
import { AddTeacherComponent } from '../component/teacher/add-teacher/add-teacher.component';
import { EditTeacherComponent } from '../component/teacher/edit-teacher/edit-teacher.component';
import { CoursesListComponent } from '../component/course/course-list/course-list.component';
import { AddCourseComponent } from '../component/course/add-course/add-course.component';
import { EditCourseComponent } from '../component/course/edit-course/edit-course.component';

export const routes: Routes = [
    { path: '', component: LoginComponent, title: 'Login' },
    { path: 'students', component: StudentsListComponent, title: 'Students List' },
    { path: 'students/new', component: AddStudentComponent },
    { path: 'students/edit/:id', component: EditStudentComponent },
    { path: 'teachers', component: TeachersListComponent, title: 'Teachers List' },
    { path: 'teachers/new', component: AddTeacherComponent },
    { path: 'teachers/edit/:id', component: EditTeacherComponent },
    { path: 'courses', component: CoursesListComponent, title: 'Course List' },
    { path: 'courses/new', component: AddCourseComponent },
    { path: 'courses/edit/:id', component: EditCourseComponent },
];