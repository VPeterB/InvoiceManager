package hu.novin.invoicemanager.mapper;

import hu.novin.invoicemanager.dto.InvoiceDTO;
import hu.novin.invoicemanager.model.Invoice;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface InvoiceMapper {
    InvoiceMapper INSTANCE = Mappers.getMapper(InvoiceMapper.class);
    InvoiceDTO toInvoiceDTO(Invoice invoice);
}
