package hu.novin.invoicemanager.dto;

import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String username;
    private Timestamp entryDate;
    private List<String> roles; // Assuming role names as strings
}
