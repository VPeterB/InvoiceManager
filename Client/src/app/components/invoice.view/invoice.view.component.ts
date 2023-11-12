import {Component, OnInit} from '@angular/core';
import {HttpServiceService} from "../../service/http-service.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-invoice.view',
  templateUrl: './invoice.view.component.html',
  styleUrls: ['./invoice.view.component.css']
})
export class InvoiceViewComponent implements OnInit{
  invoiceID: any
  invoice: any;

  constructor(private webservice: HttpServiceService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.invoiceID = params.get('invoiceId');
    })
    this.loadInvoice()
  }
  navigateBack() {
    this.router.navigate(['invoice_list'])
  }

  private loadInvoice() {
      this.webservice.get(`invoices/${this.invoiceID}`).subscribe({next: res => this.invoice = res})
  }
}
