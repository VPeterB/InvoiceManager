import { Component , OnInit} from '@angular/core';
import {UserServiceService} from "../../service/user-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  admin: boolean
  constructor(private userService: UserServiceService, private router: Router) {}

  ngOnInit(): void {
    this.admin = this.userService.hasRole('ADMIN')
  }
  logout() {
    this.userService.logout()
  }

  szamlak() {
    this.router.navigate(['invoice_list'])
  }

  goAdmin() {
    this.router.navigate(['admin'])
  }
}
