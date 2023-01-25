import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { HomeComService } from 'src/app/core/services/home-com.service';
import { TableRow } from 'src/app/models/tableRow';
import { User } from 'src/app/models/user';
import { SafeUnsubscribe } from 'src/app/shared/safe-unsubscribe/safe-unsubscribe.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent extends SafeUnsubscribe implements OnInit {
  constructor(
    private authService: AuthService,
    private homeComService: HomeComService
  ) {
    super()
  }

  isAuthenticated$: Observable<boolean> = this.authService.getIsAuthenticated$();
  routerPayload = {} as TableRow;
  user$: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.prepareDataForRouter();
    }
    this.user$.next(JSON.parse(sessionStorage.getItem('user') as string) as User);
  }

  handleLogout(): void {
    this.authService.logoutUser();
    this.homeComService.initializeDataForTable();
  }

  prepareDataForRouter(): void {
    this.user$
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(user => {
        this.routerPayload.userId = user.id;
        this.routerPayload.userName = user.name;
        this.routerPayload.userCompany = user.company;
      })
  }
}
