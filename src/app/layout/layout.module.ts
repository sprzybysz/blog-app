import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [NavigationComponent]
})
export class LayoutModule { }
