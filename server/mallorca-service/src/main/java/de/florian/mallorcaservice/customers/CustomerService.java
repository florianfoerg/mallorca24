package de.florian.mallorcaservice.customers;

import de.florian.mallorcaservice.customers.model.Customer;
import de.florian.mallorcaservice.customers.model.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CustomerService {

    private CustomerRepository customerRepository;

    public Customer addCostumer(String email){
        Customer customer = customerRepository.findCustomerByMail(email);

        if(customer != null) {
            return customer;
        }

        customer = new Customer();
        customer.setMail(email);
        customerRepository.save(customer);

        return customer;
    }
}
