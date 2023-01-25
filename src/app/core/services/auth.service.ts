import { Injectable } from '@angular/core';
import { HomeComService } from './home-com.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _users$ = new BehaviorSubject<User[]>([]);
  private _isAuthenticated$ = new BehaviorSubject<boolean>(false);

  set users(users: User[]) {
    this._users$.next(users);
  }

  get users(): User[] {
    return this._users$.getValue();
  }

  get allUsers$(): Observable<User[]> {
    return this._users$.asObservable();
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated$.value;
  }

  getIsAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated$.asObservable();
  }

  setIsAuthenticated(isAuth: boolean) {
    this._isAuthenticated$.next(isAuth);
  }

  constructor(private postService: PostService) { }

  fetchAllUsers(): void {
    this.postService.getAllUsers().pipe().subscribe(users => this.users = users)
  }

  authenticateUser(userName: string): void {
    let users = this.users.filter(user => user.username === userName);
    let isValid = users.length === 1;
    let user = users[0];
    if (isValid) {
      sessionStorage.setItem('authenticatedUser', user.id.toString());
      sessionStorage.setItem('user', JSON.stringify(user));
      this.setIsAuthenticated(isValid);
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    this.setIsAuthenticated(!!user);
    return !(user === null);
  }

  logoutUser() {
    sessionStorage.clear();
    localStorage.removeItem('tableData')
    this.setIsAuthenticated(false);
  }
}
