import { UserFormComponent } from './pages/users/form/userForm.component';
import { UserDetailComponent } from './pages/users/detail/userDetail.component';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { UserComponent } from './pages/users/user.component';
import { AppRoutingModule } from './app.routing.module';
import {RouterModule} from '@angular/router';
import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule } from '@angular/material/table'
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';



import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    UserDetailComponent,
    UserFormComponent
  ],
  imports: [
    AppRoutingModule,
    RouterModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatListModule,
    MatGridListModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
