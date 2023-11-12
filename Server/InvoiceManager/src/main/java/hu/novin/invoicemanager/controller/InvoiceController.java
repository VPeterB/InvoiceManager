package hu.novin.invoicemanager.controller;

import hu.novin.invoicemanager.dto.InvoiceDTO;
import hu.novin.invoicemanager.service.InvoiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@Validated
@RequestMapping("/api/invoices")
public class InvoiceController {
    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveInvoice(@Valid @RequestBody InvoiceDTO invoiceDTO) {
        return invoiceService.save(invoiceDTO);
    }

    @GetMapping("/all")
    public ResponseEntity<List<InvoiceDTO>> getInvoices(){
        return invoiceService.getInvoices();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id){
        return invoiceService.getInvoice(id);
    }
}
