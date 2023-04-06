package de.florian.mallorcaservice.customers;

import de.florian.mallorcaservice.customers.model.Customer;
import de.florian.mallorcaservice.customers.model.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/customers")
public class CustomerController {

    private CustomerRepository customerRepository;

    @GetMapping(value = "/all")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll();
        return ResponseEntity.ok(customers);
    }

    @PostMapping(value = "/new")
    public ResponseEntity<Void> addNewCustomer(@RequestBody String mail) {
        if(customerRepository.findAll().stream().map(Customer::getMail).toList().contains(mail)) {
            return ResponseEntity.badRequest().build();
        }

        Customer newCostumer = new Customer();
        newCostumer.setMail(mail);

        customerRepository.save(newCostumer);

        return ResponseEntity.ok().build();
    }
}
