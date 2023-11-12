import {Component, OnInit} from '@angular/core';
import {InvoiceDTO} from "../../model/models.model";
import {Router} from "@angular/router";
import {HttpServiceService} from "../../service/http-service.service";

@Component({
  selector: 'app-invoice.create',
  templateUrl: './invoice.create.component.html',
  styleUrls: ['./invoice.create.component.css']
})
export class InvoiceCreateComponent implements OnInit{
  newInvoice: InvoiceDTO;

  constructor(private router: Router, private webService: HttpServiceService) {}

  ngOnInit(): void {
    this.newInvoice = new InvoiceDTO()
  }

  saveInvoice() {
    this.webService.post('invoices/save', this.newInvoice).subscribe({error: err => {
      if(err.status == 200){this.navigateBack()}
    }})
  }

  navigateBack() {
    this.router.navigate(['invoice_list'])
  }
}
