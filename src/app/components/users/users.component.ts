import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../services/mock-data/mock-data.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, distinctUntilKeyChanged } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = []
  currentUser: User
  switchWatcher: Subject<User> = new Subject()
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.all()
      .subscribe((users: User[]) => this.users = users)

    this.switchWatcher
      .pipe(
        debounceTime(1000),
        distinctUntilChanged((prev:any, curr: any)=> prev.nickname === curr.nickname)
      )
      .subscribe((user: User) => {
        this.authService.currentUser.next(user)
      })

    this.authService.currentUser.subscribe((user: User) => this.currentUser = user)
  }

  switchUser(user: User) {
    this.switchWatcher.next(user)
  }

}
