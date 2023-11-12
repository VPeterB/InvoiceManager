package hu.novin.invoicemanager.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
public class InvoiceDTO {
    private Long id;
    @NotBlank
    private String customerName;
    @NotBlank
    private Timestamp issueDate;
    @NotBlank
    private Timestamp dueDate;
    @NotBlank
    private String itemName;
    @NotBlank
    private String comment;
    @NotBlank
    private BigDecimal price;
}
