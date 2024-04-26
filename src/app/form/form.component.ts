import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  files: File[] = [];
  imageUrls: string[] = [];

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {}

  onFileChange(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
  }

  async upload() {
    // Upload files to storage
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      const path = `images/${file.name}`;
      const uploadTask = await this.storage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      this.imageUrls.push(url);
    }

    // Store input field data into Firestore
    this.storeFormData();
    
    // Clear the input field value after uploading
    const inputElement = document.getElementById('formFile') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }

    // Optionally, you can reset the files array after uploading
    this.files = [];
  }

  storeFormData() {
    // Assuming you want to create a collection named 'formData' and store data there
    this.firestore.collection('formData').add({
      email: (document.getElementById('email') as HTMLInputElement).value,
      username: (document.getElementById('username') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value,
      // Add more fields as needed
    })
    .then(() => {
      console.log('Form data stored successfully in Firestore.');
    })
    .catch((error) => {
      console.error('Error storing form data:', error);
    });
  }
}
