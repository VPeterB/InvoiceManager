package hu.novin.invoicemanager.mapper;

import hu.novin.invoicemanager.dto.InvoiceDTO;
import hu.novin.invoicemanager.model.Invoice;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-11-12T19:57:07+0100",
    comments = "version: 1.5.0.Final, compiler: javac, environment: Java 17.0.2 (Oracle Corporation)"
)
public class InvoiceMapperImpl implements InvoiceMapper {

    @Override
    public InvoiceDTO toInvoiceDTO(Invoice invoice) {
        if ( invoice == null ) {
            return null;
        }

        InvoiceDTO invoiceDTO = new InvoiceDTO();

        invoiceDTO.setId( invoice.getId() );
        invoiceDTO.setCustomerName( invoice.getCustomerName() );
        invoiceDTO.setIssueDate( invoice.getIssueDate() );
        invoiceDTO.setDueDate( invoice.getDueDate() );
        invoiceDTO.setItemName( invoice.getItemName() );
        invoiceDTO.setComment( invoice.getComment() );
        invoiceDTO.setPrice( invoice.getPrice() );

        return invoiceDTO;
    }
}
