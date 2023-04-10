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
        Customer newCostumer = customerRepository.findCustomerByMail(email);

        if(newCostumer != null) {
            return newCostumer;
        }

        newCostumer = new Customer();
        newCostumer.setMail(email);
        customerRepository.save(newCostumer);

        return newCostumer;
    }
}
