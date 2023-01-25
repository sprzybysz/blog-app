import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostService } from './post.service';
import { User } from 'src/app/models/user';
import { TableRow } from 'src/app/models/tableRow';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeComService {
  private _posts$ = new BehaviorSubject<Post[]>([]);
  private _tableRows$ = new BehaviorSubject<TableRow[]>([]);
  private _currentTablePage$ = new BehaviorSubject<number>(1);
  private _isValidUser$ = new BehaviorSubject<boolean>(false);
  private _newPost$ = new BehaviorSubject<TableRow>({} as TableRow);

  constructor(
    private postService: PostService,
    private authSevice: AuthService
  ) { }

  get allPosts$(): Observable<Post[]> {
    return this._posts$.asObservable();
  }

  set posts(posts: Post[]) {
    this._posts$.next(posts);
  }

  get allTableRows$(): Observable<TableRow[]> {
    return this._tableRows$.asObservable();
  }

  set tableRows(rows: TableRow[]) {
    this._tableRows$.next(rows);
  }

  get currentTablePage$(): Observable<number> {
    return this._currentTablePage$.asObservable();
  }

  get isValidUser(): boolean {
    return this._isValidUser$.getValue();
  }

  set isValidUser(isValid: boolean) {
    this._isValidUser$.next(isValid);
  }

  get isValidUser$(): Observable<boolean> {
    return this._isValidUser$.asObservable();
  }

  get newPost$(): Observable<TableRow> {
    return this._newPost$.asObservable()
  }

  set newPost(newPost: TableRow) {
    this._newPost$.next(newPost)
  }

  setIsValidUser(isValid: boolean) {
    this._isValidUser$.next(isValid);
  }

  setCurrentTablePage(pageNumber: number) {
    this._currentTablePage$.next(pageNumber);
  }

  fetchAllPosts(): void {
    this.postService.getAllPosts().pipe().subscribe(posts => this.posts = posts)
  }

  initializeDataForTable(): void {
    combineLatest([this.postService.getAllPosts(), this.postService.getAllUsers()])
      .subscribe(([posts, users]) => {
        this.authSevice.users = users;
        this.posts = posts
        let tableUsers = users.map(user => {
          return {
            userId: user.id,
            userName: user.name,
            userCompany: user.company,
          } as TableRow
        })
        let tablePosts = posts.map(post => {
          return {
            userId: post.userId,
            userName: '',
            userCompany: {},
            postId: post.id,
            postTitle: post.title,
            postContent: post.body,
            isUserAuthenticated: false
          } as TableRow
        })

        let usersObj = tableUsers.reduce((accumulator, value) => {
          return { ...accumulator, [value.userId as keyof UsersObj]: { name: value.userName, company: value.userCompany } as User };
        }, {} as UsersObj);


        tablePosts.map(post => {
          post.userName = usersObj[post.userId].name;
          post.userCompany = usersObj[post.userId].company;
          post.isUserAuthenticated = this.isAuthenticatedUser(post)
        })

        this.tableRows = tablePosts;

        if(this.authSevice.isAuthenticated) {
          localStorage.setItem('tableData', JSON.stringify(tablePosts));
        }

      })
  }

  getTableRowsFromLocalStorage() {
    let data = JSON.parse(localStorage.getItem('tableData') as string) as TableRow[];
    this.tableRows = data;
  }

  private isAuthenticatedUser(tablePost: TableRow): boolean {
    return tablePost.userId === Number(sessionStorage.getItem('authenticatedUser'));
  }
}

interface UsersObj {
  [key: number]: User
}