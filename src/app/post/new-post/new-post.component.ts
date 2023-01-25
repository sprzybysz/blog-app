import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeComService } from 'src/app/core/services/home-com.service';
import { Company } from 'src/app/models/company';
import { TableRow } from 'src/app/models/tableRow';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  addPostForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.minLength(200)),
    message: new FormControl('', Validators.minLength(2000)),
  });

  routePayload = {} as TableRow;
  isEditMode = false;

  constructor(
    private homeComService: HomeComService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.homeComService.fetchAllPosts();
    this.routePayload = history.state;
    this.isEditMode = this.routePayload.postId ? true : false;
    this.populateForm(this.isEditMode);
  }

  savePost() {
    let newPost = {
      userId: this.routePayload.userId,
      userName: this.routePayload.userName,
      userCompany: this.routePayload.userCompany,
      postId: this.isEditMode ? this.routePayload.postId : this.generateId(),
      postTitle: this.addPostForm.controls['title'].value,
      postContent: this.addPostForm.controls['message'].value,
      isUserAuthenticated: true
    } as TableRow;

    this.homeComService.newPost = newPost;
    let data = JSON.parse(localStorage.getItem('tableData') as string) as TableRow[];

    console.log(newPost)

    if (this.isEditMode) {
      this.changeEditedPost(data, newPost)
    } else {
      this.addNewPost(data, newPost)
    }

    this.router.navigate(['/home'])
  }

  addNewPost(data: TableRow[], newPost: TableRow) {
    data.unshift(newPost);
    localStorage.setItem('tableData', JSON.stringify(data))
  }

  changeEditedPost(data: TableRow[], editedPost: TableRow) {
    data.forEach(row => {
      if (row.postId === editedPost.postId) {
         row.postTitle = editedPost.postTitle;
         row.postContent = editedPost.postContent;
         return row;
      }
      return row;
    })

    localStorage.setItem('tableData', JSON.stringify(data));
    this.router.navigate(['/home']);
  }

  deletePost() {
    let data = JSON.parse(localStorage.getItem('tableData') as string) as TableRow[]
    data = data.filter(row => row.postId !== this.routePayload.postId)
    localStorage.setItem('tableData', JSON.stringify(data))
    this.router.navigate(['/home']);
  }

  cancelSaving() {
    this.router.navigate(['/home'])
  }

  populateForm(isEditMode: boolean) {
    if (isEditMode) {
      this.addPostForm.get('title')?.setValue(this.routePayload.postTitle);
      this.addPostForm.get('message')?.setValue(this.routePayload.postContent)
    }
  }

  private generateId(): number {
    return Math.floor(Math.random() * 10000)
  }

}
