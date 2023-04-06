package de.florian.mallorcaservice.customers.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

// customers do not have accounts in this application. Only the e-mail address is stored in order to notify them

@Entity
@Data
@NoArgsConstructor
@Table
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long customerId;

    private String mail;

}
