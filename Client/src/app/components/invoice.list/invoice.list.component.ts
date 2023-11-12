import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from "../../service/http-service.service";
import {UserServiceService} from "../../service/user-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-invoice.list',
  templateUrl: './invoice.list.component.html',
  styleUrls: ['./invoice.list.component.css']
})
export class InvoiceListComponent implements OnInit{
  invoices: any;
  notUser: boolean;

  constructor(private webService: HttpServiceService, private userService: UserServiceService, private router: Router) {}

  ngOnInit(): void {
    this.notUser = (this.userService.hasRole('ADMIN') || this.userService.hasRole('ACCOUNTANT'))
    this.loadInvoices()
  }

  viewInvoice(id: number) {
    this.router.navigate([`invoice/${id}`])
  }

  createInvoice() {
    this.router.navigate(['invoice_create'])
  }

  private loadInvoices() {
    this.webService.get('invoices/all').subscribe({next: res => this.invoices = res})
  }
}
