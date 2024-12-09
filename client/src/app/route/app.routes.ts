import { Routes } from '@angular/router';
import { StudentsListComponent } from '../component/student/students-list/students-list.component';
import { AddStudentComponent } from '../component/student/add-student/add-student.component';
import { EditStudentComponent } from '../component/student/edit-student/edit-student.component';

export const routes: Routes = [
    { path: '', component: StudentsListComponent, title: 'Students List' },
    { path: 'new', component: AddStudentComponent },
    { path: 'edit/:id', component: EditStudentComponent },
];