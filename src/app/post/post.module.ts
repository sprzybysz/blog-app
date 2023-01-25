import { NgModule } from '@angular/core';
import { NewPostComponent } from './new-post/new-post.component';
import { SharedModule } from '../shared/shared.module';
import { PostRoutingModule } from './post-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    NewPostComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    PostRoutingModule
  ]
})
export class PostModule { }
