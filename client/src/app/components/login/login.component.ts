import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: String = '';
  loginerror: String = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register(val: User) {
    this.authService.register(val).subscribe((res) => {
      this.error = JSON.parse(JSON.stringify(res)).message;
    });
  }

  login(val: any) {
    this.authService.login(val).subscribe((res) => {
      if (res) {
        this.router.navigateByUrl('/dashboard');
      } else {
        this.loginerror = 'Wrong username or password';
      }
    });
  }
}
