import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './login/log-in.component';
import { ApiService } from './services/api.service';
import { HomeComService } from './services/home-com.service';
import { PostService } from './services/post.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CompanyComponent } from './company/company.component';

@NgModule({
  declarations: [
    HomeComponent,
    LogInComponent,
    CompanyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [HomeComponent,
    LogInComponent],
  providers: [
    ApiService,
    PostService,
    HomeComService
  ]
})
export class CoreModule { }
