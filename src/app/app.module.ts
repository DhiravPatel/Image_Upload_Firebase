import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { AngularFireStorageModule } from "@angular/fire/compat/storage"
import {AngularFireModule} from "@angular/fire/compat"
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
