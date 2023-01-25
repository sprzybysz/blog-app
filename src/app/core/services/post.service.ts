import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post';
import { ApiService } from './api.service';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private apiService: ApiService) { }

  getAllPosts(): Observable<Post[]> {
    return this.apiService.get('https://jsonplaceholder.typicode.com/posts')
  }

  getAllUsers(): Observable<User[]> {
    return this.apiService.get('https://jsonplaceholder.typicode.com/users')
  }
}
