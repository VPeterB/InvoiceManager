package hu.novin.invoicemanager.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String customerName;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "issueDate")
    private Timestamp issueDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "dueDate")
    private Timestamp dueDate;

    @NotBlank
    private String itemName;

    @NotBlank
    private String comment;

    @NotBlank
    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    public Invoice(String customerName, Timestamp issueDate, Timestamp dueDate, String itemName, String comment, BigDecimal price) {
        this.customerName = customerName;
        this.issueDate = issueDate;
        this.dueDate = dueDate;
        this.itemName = itemName;
        this.comment = comment;
        this.price = price;
    }
}
