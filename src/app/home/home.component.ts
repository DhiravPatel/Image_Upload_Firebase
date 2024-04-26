import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  imageUrls: string[] = [];

  constructor(private storage: AngularFireStorage) {}
  ngOnInit() {
    this.getImagesFromStorage();
  }

  async getImagesFromStorage() {
    const storageRef = this.storage.ref('images');
    try {
      const result = await storageRef.listAll().toPromise();
      if (result && result.items) {
        for (const itemRef of result.items) {
          const url = await itemRef.getDownloadURL();
          this.imageUrls.push(url);
        }
      } else {
        console.error('No items found in storage.');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }
}
