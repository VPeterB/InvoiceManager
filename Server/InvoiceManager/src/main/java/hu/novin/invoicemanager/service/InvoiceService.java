package hu.novin.invoicemanager.service;

import hu.novin.invoicemanager.dto.InvoiceDTO;
import hu.novin.invoicemanager.mapper.InvoiceMapper;
import hu.novin.invoicemanager.model.Invoice;
import hu.novin.invoicemanager.repository.InvoiceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;

    InvoiceService(InvoiceRepository invoiceRepository){
        this.invoiceRepository = invoiceRepository;
    }

    public ResponseEntity<String> save(InvoiceDTO invoiceDTO) {
        Invoice newInvoice = new Invoice(invoiceDTO.getCustomerName(), invoiceDTO.getIssueDate(), invoiceDTO.getDueDate(), invoiceDTO.getItemName(), invoiceDTO.getComment(), invoiceDTO.getPrice());
        invoiceRepository.save(newInvoice);
        return ResponseEntity.ok("Invoice saved successfully");
    }

    public ResponseEntity<List<InvoiceDTO>> getInvoices() {
        List<Invoice> invoices = invoiceRepository.findAll();
        return ResponseEntity.ok(invoicesToInvoiceDTOs(invoices));
    }

    private List<InvoiceDTO> invoicesToInvoiceDTOs(List<Invoice> invoices){
        List<InvoiceDTO> DTOs = new ArrayList<>();
        for(Invoice i : invoices){
            DTOs.add(InvoiceMapper.INSTANCE.toInvoiceDTO(i));
        }
        return DTOs;
    }

    public ResponseEntity<?> getInvoice(Long id) {
        Optional<Invoice> invoice = invoiceRepository.findById(id);
        if(invoice.isPresent()){
            return ResponseEntity.ok(InvoiceMapper.INSTANCE.toInvoiceDTO(invoice.get()));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invoice not found");
    }
}
