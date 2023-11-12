import { Component, OnInit} from '@angular/core';
import {HttpServiceService} from "../../service/http-service.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  users: any[];

  constructor(private webservice: HttpServiceService) {}

  ngOnInit(): void {
    this.loadUsers()
  }

  deleteUser(user: any) {
    this.webservice.delete(`users/${user.id}`).subscribe({error: err => {
      if(err.status == 200){
        this.loadUsers()
      }
      }})
  }

  private loadUsers() {
    this.webservice.get('users/all').subscribe({next: res => this.users = res})
  }
  saveUserRoles(user: any) {
    this.webservice.put(`users/${user.id}`, user.roles).subscribe(() => this.loadUsers())
  }
}
