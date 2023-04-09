package de.florian.mallorcaservice.customers.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

// customers do not have accounts in this application. Only the e-mail address is stored in order to notify them

@Entity
@Data
@NoArgsConstructor
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private UUID customerId;

    private String mail;

}
