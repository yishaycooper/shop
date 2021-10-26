import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cart: any;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCarts().subscribe((data) => {
      this.cart = data;
    });
  }

  

}
