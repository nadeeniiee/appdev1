import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc, updateDoc } from
'@angular/fire/firestore';

@Component({
selector: 'app-root',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './app.html',
styleUrls: ['./app.css']
})
export class App {
title = signal('Student Registration');
title2 = signal('Registered Students')

studentName = signal('');
studentAge = signal<number | null>(null);
studentCourse = signal('');
studentUsername = signal('');
studentEmail = signal('');
studentPassword = signal('');

students: any[] = [];

constructor(private firestore: Firestore) {
const studentsCollection = collection(this.firestore, 'students');
collectionData(studentsCollection, { idField: 'id' })
.subscribe(data => {
this.students = data; // Assign to array so Angular detects changes
});
}

addStudent() {
const name = this.studentName();
const age = this.studentAge();
const course = this.studentCourse();
const username = this.studentUsername();
const email = this.studentEmail();
const password = this.studentPassword();
if (name && age) {
const studentsCollection = collection(this.firestore, 'students');
addDoc(studentsCollection, { name, age, course, username, email, password});
this.studentName.set('');
this.studentAge.set(null);
this.studentCourse.set('');
this.studentUsername.set('');
this.studentEmail.set('');
this.studentPassword.set('');
}
}

deleteStudent(id: string) {
const studentDoc = doc(this.firestore, `students/${id}`);
deleteDoc(studentDoc);
}

updateStudent(id: string, newName: string, newAge: number, newCourse: string, newUsername: string, newEmail: string, newPassword : string) {
const studentDoc = doc(this.firestore, `students/${id}`);
updateDoc(studentDoc, { name: newName, age: newAge, course: newCourse, username: newUsername, email: newEmail,  password: newPassword });
}
}